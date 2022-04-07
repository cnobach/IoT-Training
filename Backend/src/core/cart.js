require('dotenv').config();
const { Client } = require('pg');

/**
 * Database options object. Needed for connection.
 */
const options = {
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
};

function getUserCart(cb, id) {

    const client = new Client(options);
    client.connect(err => {

        if (err) {
            console.log('connection error', err.stack)
        } else {

            const query = {
                name: 'getUserCart',
                text: 'SELECT * FROM cart WHERE userId = $1',
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
            })
        }
    })
}

//  Helper function to get a cart by the given cart ID
function getCartByCartId(cartId, cb) {

    const client = new Client(options);

    client.connect(err => {
        if (err) {
            console.log('error connecting', err.stack)
        } else {

            const query = {
                name: 'getCart',
                text: 'SELECT items FROM cart WHERE cartId = $1',
                values: [cartId]
            }

            client.query(query, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    cb(res.rows[0]);
                    client.end(err => {
                        if (err) {
                            console.log('client hit error in disconnection', err.stack)
                        } else {
                            console.log('client disconnected')
                        }
                    });
                }
            })

        }
    })
}

// Helper function to update the given cart
function updateCart(cartId, cart, cb) {
    const client = new Client(options);

    client.connect(err => {
        if (err) {
            console.log('error connecting', err.stack)
        } else {

            const query = {
                name: 'updateCart',
                text: 'UPDATE cart SET items = $1 WHERE cartId = $2 RETURNING *;',
                values: [cart, cartId]
            }

            client.query(query, (err, res) => {
                if (err) {
                    throw err;
                } else {

                    cb(res.rows[0]);

                    client.end(err => {
                        if (err) {
                            console.log('client hit error in disconnection', err.stack)
                        } else {
                            console.log('client disconnected')
                        }
                    });
                }
            })
        }
    })
}

// Function to remove the first instance of an item in the given cart
function removeItem(cb, cartId, itemId) {

    // Waits for the helper to get the cart by id
    getCartByCartId(cartId, cart => {
        cart = cart.items;

        // Finds the index of the first instance of the item
        let index = cart.indexOf(itemId);

        console.log('old cart: ', cart);
        console.log('found index: ', index);

        //  If the index was found, removes the item
        if(index > -1){
            cart.splice(index, 1);
        }

        // Waits for the update cart function to run
        updateCart(cartId, cart, newCart => {
            console.log('new cart: ', newCart.items);
            // Returns the new cart (and id)
            cb(newCart);
        });

    });
}

// Function to add a new item to the cart
function addItem(cb, cartId, itemId){

    // Waits for the helper to get the cart by id
    getCartByCartId(cartId, cart => {
        cart = cart.items;
        console.log('old cart: ', cart);

        // Adds new item to the array
        cart.push(itemId);
    
        // Waits for the update cart function to run
        let newCart = updateCart(cartId, cart, newCart => {     
            console.log('new cart: ', newCart);
            // Returns the new cart (and ids)
            cb(newCart);
        });

    });
}

// Function to clear the users cart
function clearCart(cb, cartId){
    const empty = [];
    updateCart(cartId, empty, newCart => {
        console.log('new cart: ', newCart);
        cb(newCart);
    });
}

// Function to create a cart for a user. called whenever a user is created
function createCart(cb, userId){
    const client = new Client(options);

    client.connect(err => {
        if (err) {
            console.log('error connecting', err.stack);
        } else {

            const query = {
                name: 'createCart',
                text: `INSERT INTO cart(userId, items) VALUES ($1, '{}')`,
                values: [userId]
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
    getUserCart,
    addItem,
    removeItem,
    clearCart,
    createCart
}
