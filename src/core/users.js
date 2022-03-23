require('dotenv').config();
const { Client } = require('pg');

/**
 * Database options object. Needed for connection
 */
const options = {
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
};

/**
 * Selects and returns all user from the database.
 * 
 * @param { CallBack Function } cb 
 */
function getAllUsers ( cb ) {
    const client = new Client(options);
    client.connect();
    client.query("SELECT * FROM users", (err, res) => {
        if(err){
            throw err;
        }
        cb(res.rows);
    })
}

module.exports = {
    getAllUsers
}