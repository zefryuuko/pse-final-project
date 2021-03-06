# Smart Trash Management System

Pervasive Software Engineering Final Project Repository

![Build backend image](https://github.com/zefryuuko/pse-final-project/workflows/Build%20backend%20image/badge.svg?branch=main)
![Build frontend image](https://github.com/zefryuuko/pse-final-project/workflows/Build%20frontend%20image/badge.svg)

## Product Summary
The smart trash management sytem allows the users to receive updates on the amount of content each trash has every time it is added. The user will get a notification on the amount of trash in the trash bin through a graphical user interface web application. With the help of an open-sourced multi-dimensional visualization web application called Grafana, users will be able to view the analytics and statistics of the trash bin through a graph and attractive visualization. This helps ensure that user can manage the efficiency of workload and manpower needed to do trash control.

This may be beneficial for offices, malls, festivals, or even public facilities such as the road, pedestrian walking, train stations, airports, and others. Eradicating the need to send people to do a roll in checking each of the trash container and rather using this efficient system to check for trends and to minimize resources. With these analytics, users can find trash hotspot location, the time of day trash is most often added, and others. Furthermore, the investment needed to implement this system is low. There are only a few components and a computer.

The components used are:
1. HC-SR04 Ultrasonic Sensor (Rp 12.000,00)
2. Reed switch (Rp 2.000,00)
3. Wemos D1 Mini ESP8266 module (Rp 35.000,00)
4. Battery shield (Rp 20.000,00)
5. 18650 battery + case (Rp 22.000,00)
6. Mini breadboard (Rp 5.000,00)

All those components will be placed in each of the trash containers. The total sum of money needed to create the sensor is around Rp 96.000,00. The ultrasonic sensor allows the device to measure the distance from the lid of the trash container to the trash. The reed switch triggers the device to send the distance when a trash is added by disconnecting when the lid is open and reconnecting when the lid is closed. The battery will be used to power the device. The ESP8266 module will be used to connect to the WiFi and acts as the brain of the device. The battery shield allows the batteries to be attached to the ESP8266 module. When the device is in idle, it will go to a deep sleep mode to save energy. Every time trash is added into the trash container, the ID of the trash container, the height of the trash, the max height of the trash container, and the remaining voltage of the battery.

## User Manual
To host and run the application, there are several things that you have to setup and modify.

### Web Application
Before you can run the applications, you need to have several dependencies set up. The requirements are as follows:
- Docker
- MariaDB/MySQL
- Mosquitto Broker
- Grafana

With all of the dependencies set up, you can use the prebuilt container `zefryuuko/pse-backend:latest` available on the Docker Hub. You need to expose the port `3000` from the container to access it from outsite the container, or use reverse proxy software such as traefik or nginx. In addition, you also need to add the following environment variables:
- MariaDB/MySQL configuration: `MYSQL_HOST`, `MYSQL_USER`, `MYSQL_PASS`, `MYSQL_DB_NAME`, `MYSQL_POOL_SIZE`
- Mosquitto: `MQTT_ADDRESS`, `MQTT_TRASH_DATA_RECEIVE_TOPIC`

With the backend in place, you can deploy the frontend of this project by first changing the API endpoint to your backend hostname, build the Docker container, then deploy the application.

### ESP8266
You can flash the software available on the `arduino` folder with the Arduino IDE. Before you compile and upload the software, you need to change several variables. - `WLAN_SSID`: The WiFi name that the ESP8266 will connect to
- `WLAN_PASS`: The password of the WiFi
- `MQTT_ADDR`: The hostname of the MQTT broker
- `MQTT_PORT`: The port of the MQTT broker

You can also change the MQTT topic that the ESP8266 will publish to on this section:
 ```
 Adafruit_MQTT_Publish socket1Pub = Adafruit_MQTT_Publish(&mqtt, "MQTT_TOPIC_HERE");
 ```
 
### Using the app

When the admin opens the web application, the admin will be directed into the dashboard page of the web application as shown in the screenshot below. In the dashboard, the admin will be able to see the trash usage statistics in a given moment. The statistics is in a shape of a graph with the activity count of trash added against the time. The admin will be able to press on a specific time and add annotations such as description and tag.

![Dashboard](https://github.com/zefryuuko/pse-final-project/blob/main/assets/Screenshot%202021-01-17%20233648.png?raw=true)

![Detail Dashboard](https://github.com/zefryuuko/pse-final-project/blob/main/assets/Screenshot%202021-01-17%20233715.png?raw=true)

On the right hand side of the screen houses the control panel. The admin can choose "Trash Bins" which enlists all the trash bin registered in the web application and the admin can choose the trash bins categorized in specific rooms. As the screenshot shows below, the admin can add trash bins by adding the name and location of the trash bin. The admin can also see the name of the trash bin, the amount of contents in the trash bin, and the battery percentage of the trash bin. The admin can also see how many trash bins need to be cleaned up and how many trash bins needs their battery charged or changed.

![Trash Bin Details](https://github.com/zefryuuko/pse-final-project/blob/main/assets/Screenshot%202021-01-17%20233730.png?raw=true)

## Video
The video consists of the product prototype along with the manual of how to use the product with the web application user interface.

The video can be found in the link below: 

https://www.youtube.com/watch?v=ZiJk2d3_JKE

## Poster
![Poster](https://github.com/zefryuuko/pse-final-project/blob/main/assets/BINUSMAYA%20V%20(1).png?raw=true)
