#include <ESP8266WiFi.h>
#include <Adafruit_MQTT.h>
#include <Adafruit_MQTT_Client.h>
#include <WiFiManager.h>

// WiFi Manager
WiFiManager wifiManager;

// MQTTaaa
#define WLAN_SSID "Its mine"
#define WLAN_PASS "wordpass"
#define MQTT_ADDR "netherportal.zef.sh"
#define MQTT_PORT 1883

WiFiClient client;
Adafruit_MQTT_Client mqtt(&client, MQTT_ADDR, MQTT_PORT);

// MQTT Feeds Setup
Adafruit_MQTT_Publish socket1Pub = Adafruit_MQTT_Publish(&mqtt, "socket1R");

// MQTT Functions
void MQTT_connect() {
  int8_t ret;

  // Stop if connected
  if (mqtt.connected()) {
    return;
  }

  Serial.print("Connecting to MQTT...");

  uint8_t retries = 3;
  while ((ret = mqtt.connect()) != 0) {
    Serial.println(mqtt.connectErrorString(ret));
    Serial.println("Retrying MQTT connection in 5 seconds...");
    mqtt.disconnect();
    delay(3000);
    retries--;

    if (retries == 0) {
      while(1);
    }
  }
  Serial.println("MQTT Connected!");
}

// Publish a response
void publishResponse(String content) {
  char* buffer = new char[100];
  content.toCharArray(buffer, 100);
  if(! socket1Pub.publish(buffer)) {
    Serial.println(F("Failed to send MsgAcceptedResponse"));
  } else {
    Serial.println(F("MsgAcceptedResponse OK!"));
  }
  delete[] buffer;
}

// PINS
#define trig 13
#define echo 12
#define reed 2

// Initialize
float distArray[5];
float distance;
float pingTime;
float distTotal = 0.0;
unsigned int raw = 0;
float volt = 0.0;

void setup() {
  pinMode(trig, OUTPUT);
  pinMode(echo, INPUT);
  pinMode(reed, INPUT);
  pinMode(A0, INPUT);  // Built in for battery voltage pin
  Serial.begin(9600);

  // MQTT Connection
  Serial.print("Connecting to ");
  Serial.println(WLAN_SSID);

  WiFi.begin(WLAN_SSID, WLAN_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("WiFi connected");
  MQTT_connect();
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  int switchState = digitalRead(reed);

  while (switchState == 1) {
    switchState = digitalRead(reed);
    delay(1000);
  }

  if (switchState == 0) {
    // Calculate the distance
    for (int8_t i = 0; i < 5; i++) {
      digitalWrite(trig, LOW);
      delayMicroseconds(2);
      digitalWrite(trig, HIGH);
      delayMicroseconds(10);
      digitalWrite(trig, LOW);
      pingTime = pulseIn(echo, HIGH);
      distance = pingTime * (0.034 / 2);
      delay(100);
      distArray[i] = distance;  // add distance into array
    }

    for (int i = 0; i < 5; i++) {
      distTotal += distArray[i];  // add all distances
    }

    // Battery level
    raw = analogRead(A0);
    volt = raw/1023.0;
    volt = volt*4.2;

    float finalDistance = distTotal / 5.0;  // average distances in array
    Serial.println(finalDistance);  // print out the distance
    Serial.println(volt);  // print out voltage

    String binId = String(WiFi.hostname());
    String currentHeight = String(finalDistance);
    String maxHeight = "30";
    String response = String(binId + " " + currentHeight + " " + maxHeight + " " + volt);
    
    publishResponse(response);
    delay(3000);
    }
}

void loop() {
  ESP.deepSleep(99999999);
  }
