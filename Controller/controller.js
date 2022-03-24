require('dotenv').config();
const { Client } = require('pg');

const options = {
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
}

exports.getAllUsers = async(req, res) => {
    const client = new Client(options);
    client.connect();
    client.query("SELECT * FROM users", (err, data) => {
        if(err){
            throw err;
        }
        res.status(200).json(res.rows);
    })
}