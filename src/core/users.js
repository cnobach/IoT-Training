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

//  For not functioning helper
const dbConnection = null;

/**
 * Selects and returns all user from the database.
 * 
 * @param { CallBack Function } cb 
 */
function getAllUsers (cb) {

    const client = new Client(options);
    client.connect(err => {
        if(err){
            console.log('connection error', err.stack)
        } else {
            client.query("SELECT * FROM users;", (err, res) => {
                if(err){
                    throw err;
                }
                cb(res.rows);
        
                client.end(err => {
                    if(err){
                        console.log('client hit error in disconnection', err.stack)
                    } else {
                        console.log('client disconnected')
                    }
                });
        
            })
        }
    });
}

/**
 * Function to get a user by ID from the database
 * @param { Callback Function } cb 
 * @param { ID parameter } id 
 */
function getUserByID (cb, id) {
    const client = new Client(options);
    
    client.connect(err => {
        if(err){
            console.log('error connecting', err.stack);
        } else {

            const query = {
                name: 'getById',
                text: 'SELECT * FROM users WHERE id = $1',
                values: [id]
            }

            client.query(query, (err, res) => {

                if(err){
                    throw err;
                } 
                cb(res.rows);
                client.end(err => {
                    if(err){
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
 * Creates a new user in the database. Returns the made user.
 * @param {Callback Function} cb 
 * @param {JSON} data 
 */
function createUser (cb, data) {
    const client = new Client(options);

    client.connect(err => {
        if(err){
            console.log('error connecting', err.stack);
        } else {

            const query = {
                name: 'createUser',
                text: 'INSERT INTO users(name, password, email, address, city, state, zip) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;',
                values: [data.name, data.password, data.email, data.address, data.city, data.state, data.zip]
            }

            client.query(query, (err, res) => {

                if(err){
                    throw err;
                } 
                cb(res.rows);
                client.end(err => {
                    if(err){
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
 * Updates a user in the database given their ID. Returns new user obj.
 * @param {Callback function} cb 
 * @param {JSON} data 
 */
function updateUser (cb, data) {
    const client = new Client(options);

    client.connect(err => {
        if(err){
            console.log('error connecting', err.stack);
        } else {

            const query = {
                name: 'updateUser',
                text: 'UPDATE users SET name=$1, password=$2, email=$3, address=$4, city=$5, state=$6, zip=$7 WHERE id=$8 RETURNING *;',
                values: [data.name, data.password, data.email, data.address, data.city, data.state, data.zip, data.id]
            }

            client.query(query, (err, res) => {

                if(err){
                    throw err;
                } 
                cb(res.rows);
                client.end(err => {
                    if(err){
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
 * Deletes a user from the DB given the ID. Returns the deleted user obj.
 * @param {Callback function} cb 
 * @param {ID number} id 
 */
function deleteUser (cb, id) {
    const client = new Client(options);

    client.connect(err => {
        if(err){
            console.log('error connecting', err.stack);
        } else {

            const query = {
                name: 'deleteUser',
                text: 'DELETE FROM users WHERE id=$1 RETURNING *;',
                values: [id]
            }

            client.query(query, (err, res) => {

                if(err){
                    throw err;
                } 
                cb(res.rows);
                client.end(err => {
                    if(err){
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
 * TODO: Helper function to create DB connection
 */
function getConnection() {

    dbConnection.connect(err => {
        if(err){
            console.log('Client encountered error', err.stack);
            return false;
        } else {
            console.log('Client connected');
            return true;
        }
    });

}

/**
 * TODO: Helper function to close DB connection
 */
function closeConnection(){

    dbConnection.end(err => {
        console.log('client has disconnected');
        if(err) {
            console.log('error during disconnection', err.stack);
        }
    })

}

module.exports = {
    getAllUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser
}