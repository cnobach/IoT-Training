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

function getInventory(cb, id){

    const client = new Client(options);
    client.connect(err => {
        if(err) {
            console.log('connection error', err.stack)
        } else {

            const query = {
                name: 'getInventoryById',
                text: 'SELECT quantity FROM inventory WHERE itemId = $1',
                values: [id]
            };

            client.query(query, (err, res) => {
                if(err){
                    console.log('Couldnt find inventory:\n', err.stack);
                    cb(-1);
                } else {
                    cb(res.rows);
                }
            })
        }
    })
}

function setInventory(cb, id, amount){
    const client = new Client(options);
    client.connect(err => {
        if(err) {
            console.log('connection error', err.stack)
        } else {

            const query = {
                name: 'setInventoryNumber',
                text: 'UPDATE inventory SET quantity = $1 WHERE itemId = $2',
                values: [amount.amount, id]
            };

            client.query(query, (err, res) => {
                if(err){
                    console.log('Couldnt set inventory:\n', err.stack);
                    cb(false);
                } else {
                    cb(true);
                }
            })
        }
    })
}

module.exports = {
    getInventory,
    setInventory
}