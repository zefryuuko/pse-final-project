const mqtt = require('mqtt');

class MqttClient {
    constructor() {
        // Check environment variables
        this.checkEnvironmentVariables();

        // Connect to MQTT broker
        console.log(`[MqttClient] Connecting to MQTT... ${process.env.MQTT_ADDRESS}`);
        this.client = mqtt.connect(process.env.MQTT_ADDRESS);
        this.client.on('connect', this.onMqttConnect);
        this.client.on('message', this.onMqttMessageReceived);
        this.onMessageReceivedCallbacks = [];
    }
    
    onMqttConnect = () => {
        console.log(`[MqttClient] Connected to ${process.env.MQTT_ADDRESS}`);

        // Subscribe to topics
        console.log(`[MqttClient] Subsribing to topic ${process.env.MQTT_TRASH_DATA_RECEIVE_TOPIC}`);
        this.client.subscribe(process.env.MQTT_TRASH_DATA_RECEIVE_TOPIC, err => this.onClientSubscribe(err));
    }
    
    onMqttMessageReceived = (topic, message) => {
        console.log(`[MqttClient] Received data from topic '${topic}' with value '${message}'`);
        this.onMessageReceivedCallbacks.forEach(callback => {
            if (callback) callback(`${topic}`, `${message}`);
        });
    }

    onClientSubscribe = (err) => {
        if (err) throw err;
        console.log("[MqttClient] Subscribe successful.")
    }
    
    checkEnvironmentVariables = () => {
        if (!process.env.MQTT_ADDRESS) throw new Error("Missing environment variable 'MQTT_ADDRESS'");
        if (!process.env.MQTT_TRASH_DATA_RECEIVE_TOPIC) throw new Error("Missing environment variable 'MQTT_TRASH_DATA_RECEIVE_TOPIC");
    }
}

module.exports = new MqttClient();