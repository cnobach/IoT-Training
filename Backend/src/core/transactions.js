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

function newTrans(cb, body){

    const client = new Client(options);
    client.connect(err => {
        if(err) {
            console.log('connection error', err.stack)
        } else {

            const query = {
                name: 'createTransaction',
                text: 'INSERT INTO transaction(items, customer, date) VALUES($1, $2, $3) RETURNING *;',
                values: [body.items, body.id, new Date()]
            };

            client.query(query, (err, res) => {
                if(err){
                    console.log('Couldnt create transaction:\n', err.stack);
                    cb(false);
                } else {
                    cb(true);
                }
            })
        }
    })
}

module.exports = {
    newTrans
}