# Smart Trash Management System

Pervasive Software Engineering Final Project Repository

![Build backend image](https://github.com/zefryuuko/pse-final-project/workflows/Build%20backend%20image/badge.svg?branch=main)

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
The web application portal to access admin page along with the trash statistics can be accessed from https://pse.zef.sh

When the admin opens the web application, the admin will be directed into the dashboard page of the web application as shown in the screenshot below. In the dashboard, the admin will be able to see the trash usage statistics in a given moment. The statistics is in a shape of a graph with the activity count of trash added against the time. The admin will be able to press on a specific time and add annotations such as description and tag.

![Dashboard](https://github.com/zefryuuko/pse-final-project/blob/main/assets/Screenshot%202021-01-17%20233648.png?raw=true)

On the right hand side of the screen houses the control panel. The admin can choose "Trash Bins" which enlists all the trash bin registered in the web application and the admin can choose the trash bins categorized in specific rooms. As the screenshot shows below, the admin can add trash bins by adding the name and location of the trash bin. The admin can also see the name of the trash bin, the amount of contents in the trash bin, and the battery percentage of the trash bin. The admin can also see how many trash bins need to be cleaned up and how many trash bins needs their battery charged or changed.

## Video
The video consists of the product prototype along with the manual of how to use the product with the web application user interface.

The video can be found in the link below: 

## Poster
