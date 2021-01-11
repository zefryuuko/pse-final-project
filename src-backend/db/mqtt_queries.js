const db = require('./mysql_client').client;

class MqttQueries {
    constructor(mqttClient) {
        if (!mqttClient)
            throw new Error("Missing constructor parameter: mqttClient");

        // Push MQTT topic receive callback 
        mqttClient.onMessageReceivedCallbacks.push(this.mqttSubscribeCallback);
        console.log("[MqttQueries] Added callback to MQTT subscribe callbacks");
    }

    mqttSubscribeCallback = (topic, message) => {
        switch (topic) {
            case process.env.MQTT_TRASH_DATA_RECEIVE_TOPIC:
                const msgSplit = message.split(' ');
                const hardwareId = msgSplit[0];
                const currentHeight = msgSplit[1];
                const maxHeight = msgSplit[2];
                const batteryVoltage = msgSplit[3];
                console.log(`[MqttQueries] Received data from trash bin ${hardwareId}`);
                this.addTrashBinData(hardwareId, currentHeight, maxHeight, batteryVoltage);
                break;
            default:
                break;
        }
    }

    addTrashBinData = async (hardwareId, currentHeight, maxHeight, batteryVoltage) => {
        db.query(
            'INSERT INTO trash_data (hardware_id, maximum_distance, current_distance, battery_voltage, time)\
             VALUES (?, ?, ?, ?, NOW())',
            [hardwareId, maxHeight, currentHeight, batteryVoltage],
            (err, res) => {
                if (err) throw err;
                console.log("[MqttQueries] Data added successfully.");
            }
        );
    }
}

module.exports = MqttQueries;