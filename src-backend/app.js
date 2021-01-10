const express = require('express');
const dotenv = require('dotenv');

// Initialize modules
dotenv.config();
const app = express();
const mqttClient = require('./mqtt/mqtt_client');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
mqttClient.onMessageReceivedCallbacks.push((topic, message) => {
    console.log(message);
})