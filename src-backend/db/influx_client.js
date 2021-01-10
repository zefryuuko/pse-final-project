const Influx = require('influxdb-nodejs');

class InfluxClient {
    constructor() {
        this.checkEnvironmentVariables();

        // Connect to InfluxDB Server
        console.log(`[InfluxClient] Creating a client to ${process.env.INFLUXDB_ADDRESS}`);
        this.client = new Influx(process.env.INFLUXDB_ADDRESS);
    }

    checkEnvironmentVariables = () => {
        if (!process.env.INFLUXDB_ADDRESS) throw new Error("Missing environment variable 'INFLUXDB_ADDRESS'");
    }
}

module.exports = new InfluxClient();