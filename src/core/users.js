require('dotenv').config();
const { Client } = require('pg');

const options = {
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
};

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