const mysql = require('mysql2/promise');

class MysqlClient {
    constructor() {
        this.checkEnvironmentVariables();

        // Create MySQL Clients
        this.client = mysql.createPool({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASS,
            database: process.env.MYSQL_DB_NAME,
            waitForConnections: true,
            connectionLimit: process.env.MYSQL_POOL_SIZE
        });
        console.log(`[MysqlClient] Created connection pool to ${process.env.MYSQL_HOST}`);
    }

    checkEnvironmentVariables = () => {
        const requiredEnvironmentVariables = [
            "MYSQL_HOST", "MYSQL_USER", "MYSQL_PASS", "MYSQL_DB_NAME", "MYSQL_POOL_SIZE"
        ];
        
        requiredEnvironmentVariables.forEach(environmentVariable => {
            if (!process.env[environmentVariable]) 
                throw new Error(`Missing environment variable '${environmentVariable}'`);
        });
    }
}

module.exports = new MysqlClient();