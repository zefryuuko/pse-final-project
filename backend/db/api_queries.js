const db = require('./mysql_client').client;

class ApiQueries {
    getTrashCans = async () => {
        try {
            const result = await db.query(
                'SELECT metadata.*, data.current_usage, data.battery_voltage FROM trashcan_metadata metadata\
                 JOIN (SELECT id, hardware_id, current_usage, battery_voltage FROM trash_data WHERE id IN (SELECT MAX(id) FROM trash_data GROUP BY hardware_id)) data\
                 ON metadata.hardware_id = data.hardware_id'  
            );
            return result[0];
        } catch (err) {
            throw err;
        }
    }

    getTrashCan = async (hardwareId) => {
        try {
            const result = await db.query(
                'SELECT metadata.*, data.current_usage, data.battery_voltage FROM trashcan_metadata metadata\
                 JOIN (SELECT hardware_id, current_usage, battery_voltage FROM trash_data WHERE hardware_id = ? ORDER BY time DESC LIMIT 1) data\
                 ON metadata.hardware_id = data.hardware_id',
                [hardwareId]  
            );
            return result[0][0];
        } catch (err) {
            throw err;
        }
    }

    getUnconfiguredTrashCan = async () => {
        try {
            const result = await db.query(
                'SELECT DISTINCT hardware_id FROM trash_data\
                 WHERE hardware_id NOT IN (SELECT hardware_id FROM trashcan_metadata)'  
            );
            return result;
        } catch (err) {
            throw err;
        }
    }

    addTrashCanMetadata = async (hardwareId, name, maxDistance, locationId) => {
        try {
            const result = await db.query(
                'INSERT INTO trashcan_metadata (hardware_id, name, max_distance, location_id)\
                 VALUES (?, ?, ?, ?)',
                 [hardwareId, name, maxDistance, locationId]
            );
            if (result[0].affectedRows == 1) return true;
            else return false
            return result;
        } catch (err) {
            if (err.code == 'ER_DUP_ENTRY') return false;
            throw err;
        }
    }

    setTrashCanGrafanaId = async (hardwareId, grafanaId) => {
        // TODO: implement this
    }

    updateTrashCanMetadata = async (hardwareId, name, maxDistance, locationId, grafanaId) => {
        // TODO: implement this
    }
}

module.exports = new ApiQueries();