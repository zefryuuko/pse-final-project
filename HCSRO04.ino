int trig = 12;
int echo = 11;
int distArray[5];
int distance;
int pingTime;
int distTotal = 0;

void setup() {
  // put your setup code here, to run once:
  pinMode(trig, OUTPUT);
  pinMode(echo, INPUT);
  Serial.begin(9600);

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
  Serial.print(finalDistance);
}

void loop() {}
