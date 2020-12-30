int trig = 12;
int echo = 11;
int reed = 3;

int distArray[5];
int distance;
int pingTime;
int distTotal = 0;

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(trig, OUTPUT);
  pinMode(echo, INPUT);
  pinMode(reed, INPUT);
  Serial.begin(9600);

  int switchState = digitalRead(reed);

  while (switchState == 1) {
    switchState = digitalRead(reed);
  }

  if (switchState == 0) {
      for (int i = 0; i < 5; i++) {
        digitalWrite(trig, LOW);
        delayMicroseconds(2);
        digitalWrite(trig, HIGH);
        delayMicroseconds(10);
        digitalWrite(trig, LOW);
        pingTime = pulseIn(echo, HIGH);
        distance = pingTime * (0.034 / 2);
        delay(100);
        distArray[i] = distance;
      }
    
      for (int i = 0; i < 5; i++) {
        distTotal += distArray[i];    
      }
    
      int finalDistance = distTotal / 5;
      Serial.println(finalDistance);
    }

  
}
  
void loop() {}
