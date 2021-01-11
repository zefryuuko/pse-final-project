const express = require('express');
const dotenv = require('dotenv');

// Initialize modules
dotenv.config();
const app = express();

const mqttClient = require('./mqtt/mqtt_client');
const mysqlClient = require('./db/mysql_client');

const MqttQueries = require('./db/mqtt_queries');
const mqttQueries = new MqttQueries(mqttClient);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
mqttClient.onMessageReceivedCallbacks.push((topic, message) => {
    console.log(message);
})