const db = require('./mysql_client').client;

class ApiQueries {
    getUnconfiguredTrashCan = async () => {
        try {
            const result = await db.query(
                'SELECT DISTINCT hardware_id FROM trash_data\
                 WHERE ID NOT IN (SELECT hardware_id FROM trashcan_metadata)'  
            );
            console.log(result);
            return result;
        } catch (err) {
            throw(err);
        }
    }
}

module.exports = new ApiQueries();