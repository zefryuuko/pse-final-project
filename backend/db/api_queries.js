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
            throw(err);
        }
    }
}

module.exports = new ApiQueries();