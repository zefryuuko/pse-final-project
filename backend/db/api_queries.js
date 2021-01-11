const db = require('./mysql_client').client;

class ApiQueries {
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
}

module.exports = new ApiQueries();