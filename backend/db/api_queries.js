const db = require('./mysql_client').client;

class ApiQueries {
    // -------------------------------
    // Trash Can CRUD
    // ------------------------------- 

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

    updateTrashCan = async (hardwareId, name, maxDistance, locationId, grafanaId) => {
        try {
            const result = await db.query(
                'UPDATE trashcan_metadata SET name = ?, max_distance = ?, location_id = ?, grafana_id = ?\
                WHERE hardware_id = ?',
                [name, maxDistance, locationId, grafanaId, hardwareId]
            );
            if (result[0].affectedRows == 0) return false;
            return true;
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
        try {
            const result = await db.query(
                'UPDATE trashcan_metadata SET grafana_id = ?\
                WHERE hardware_id = ?',
                [grafanaId, hardwareId]
            );
            if (result[0].affectedRows == 0) return false;
            return true;
        } catch (err) {
            throw err;
        }
    }

    // -------------------------------
    // Locations CRUD
    // ------------------------------- 
    getLocations = async () => {
        try {
            const result = await db.query(
                'SELECT * from locations'
            );
            return result[0];
        } catch (err) {
            throw err;
        }
    }

    getLocation = async (locationId) => {
        try {
            const result = await db.query(
                'SELECT * FROM locations WHERE id = ?',
                [locationId]
            );
            if (result[0].length > 0) return result[0][0];
            return { message: "Location not found" };
        } catch (err) {
            throw err;
        }
    }

    createLocation = async (name) => {
        try {
            // Make sure there are no rooms with the same name
            const roomWithNameExists = await db.query(
                'SELECT * FROM locations WHERE name = ?',
                [name]
            );

            if (roomWithNameExists[0].length > 0) return false;

            const result = await db.query(
                'INSERT INTO locations (name) VALUES (?)',
                [name]
            );
            return true;
        } catch (err) {
            throw err;
        }
    }

    updateLocation = async (locationId, name) => {
        try {
            // Make sure there are no rooms with the same name
            const roomWithNameExists = await db.query(
                'SELECT id FROM locations WHERE name = ?',
                [name]
            );
            if (roomWithNameExists[0].length > 0) return false;

            const result = await db.query(
                'UPDATE locations SET name = ? WHERE id = ?',
                [name, locationId]
            );
            return true;
        } catch (err) {
            throw err;
        }
    }

    deleteLocation = async(locationId) => {
        try {
            const deleteLocationsResult = await db.query(
                'DELETE FROM locations WHERE id = ?',
                [locationId]
            );
            if (deleteLocationsResult[0].affectedRows > 0) return true;
            return false;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new ApiQueries();