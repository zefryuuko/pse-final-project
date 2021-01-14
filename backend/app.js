const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

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
app.use(cors());

// Routes
app.use('/bins', require('./routes/bins.route'));
app.use('/locations', require('./routes/locations.route'));

// Serve
app.listen(3000, () => {
    console.log(`[App] Server is listening on port 3000`);
});
