#include <ESP8266WiFi.h>
#include <Adafruit_MQTT.h>
#include <Adafruit_MQTT_Client.h>

// MQTT
#define WLAN_SSID "BSD3"
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
void publishResponse(int content) {
  if(! socket1Pub.publish(content)) {
    Serial.println(F("Failed to send MsdAcceptedResponse"));
  } else {
    Serial.println(F("MsgAcceptedResponse OK!"));
  }
}

// PINS
#define trig 13
#define echo 12
#define reed 2

// Initialize
int distArray[5];
int distance;
int pingTime;
int distTotal = 0;

void setup() {
  pinMode(trig, OUTPUT);
  pinMode(echo, INPUT);
  pinMode(reed, INPUT);
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

    int finalDistance = distTotal / 5;  // average distances in array
    Serial.println(finalDistance);  // print out the distance
    publishResponse(finalDistance); 
    }
}

void loop() {

  ESP.deepSleep(99999999);
  
  }
