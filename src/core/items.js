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
 * Gets all of the items from the DB
 * @param {Callback Function} cb 
 */
function getAllItems(cb) {
    const client = new Client(options);
    client.connect(err => {
        if (err) {
            console.log('connection error', err.stack);
        } else {
            client.query('SELECT * FROM items;', (err, res) => {
                if (err) {
                    throw err;
                }
                cb(res.rows);
                client.end(err => {
                    if (err) {
                        console.log('client hit error in disconnection', err.stack)
                    } else {
                        console.log('client disconnected')
                    }
                })
            })
        }
    })
}

/**
 * Finds and returns an item based on the ID
 * @param {Callback Function} cb 
 * @param {ID Of Item} id 
 */
function getItemById(cb, id) {
    const client = new Client(options);

    client.connect(err => {
        if (err) {
            console.log('error connecting', err.stack);
        } else {

            const query = {
                name: 'getById',
                text: 'SELECT * FROM items WHERE id = $1',
                values: [id]
            }

            client.query(query, (err, res) => {

                if (err) {
                    throw err;
                }
                cb(res.rows);
                client.end(err => {
                    if (err) {
                        console.log('client hit error in disconnection', err.stack)
                    } else {
                        console.log('client disconnected')
                    }
                });
            });
        }
    });
}

/**
 * Creates a new Item in the DB. Returns new object
 * @param {Callback function} cb 
 * @param {JSON of item} data 
 */
function createItem(cb, data) {
    const client = new Client(options);

    client.connect(err => {
        if (err) {
            console.log('error connecting', err.stack);
        } else {

            data.date = new Date(data.date);
            console.log('\n\n', data.date);

            const query = {
                name: 'createItem',
                text: 'INSERT INTO items(name, date, description, price) VALUES($1, $2, $3, $4) RETURNING *;',
                values: [data.name, data.date, data.description, data.price]
            }

            client.query(query, (err, res) => {

                if (err) {
                    throw err;
                }
                cb(res.rows);
                client.end(err => {
                    if (err) {
                        console.log('client hit error in disconnection', err.stack)
                    } else {
                        console.log('client disconnected')
                    }
                });
            });
        }
    });
}

/**
 * Updates an item in the DB. Returns updated Item obj
 * @param {Callback Function} cb 
 * @param {JSON data of Item} data 
 */
function updateItem(cb, data) {
    const client = new Client(options);

    client.connect(err => {
        if (err) {
            console.log('error connecting', err.stack);
        } else {

            data.date = new Date(data.date);
            console.log('\n\n', data.date);

            const query = {
                name: 'updateItem',
                text: 'UPDATE items SET name=$1, date=$2, description=$3, price=$4 WHERE id=$5 RETURNING *;',
                values: [data.name, data.date, data.description, data.price, data.id]
            }

            client.query(query, (err, res) => {

                if (err) {
                    throw err;
                }
                cb(res.rows);
                client.end(err => {
                    if (err) {
                        console.log('client hit error in disconnection', err.stack)
                    } else {
                        console.log('client disconnected')
                    }
                });
            });
        }
    });
}

/**
 * Deletes an item form the DB. Returns deleted object.
 * @param {Callback Function} cb 
 * @param {ID to delete} id 
 */
function deleteItem(cb, id) {
    const client = new Client(options);

    client.connect(err => {
        if (err) {
            console.log('error connecting', err.stack);
        } else {

            const query = {
                name: 'deleteItem',
                text: 'DELETE FROM items WHERE id=$1 RETURNING *;',
                values: [id]
            }

            client.query(query, (err, res) => {

                if (err) {
                    throw err;
                }
                cb(res.rows);
                client.end(err => {
                    if (err) {
                        console.log('client hit error in disconnection', err.stack)
                    } else {
                        console.log('client disconnected')
                    }
                });
            });
        }
    });
}

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
}