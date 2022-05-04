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

            console.log('cart id: ', cartId);
            
            const query = {
                name: 'getCart',
                text: 'SELECT items FROM cart WHERE cartId = $1',
                values: [cartId]
            }

            client.query(query, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    
                    console.log('look here', res.rows);

                    cb(res.rows[0]);
                    client.end(err => {
                        if (err) {
                            console.log('client hit error in disconnection', err.stack)
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
function addItem(cb, userId, itemId){

    getUserCart(cart => {

        console.log('cart inside getUserCart in add', cart[0])
        let cartId = cart[0].cartid;
        console.log('cartid', cartId)
        cart = cart[0].items;
        console.log('old cart: ', cart);

        // Adds new item to the array
        cart.push(itemId);
    
        // Waits for the update cart function to run
        updateCart(cartId, cart, newCart => {     
            console.log('new cart: ', newCart);
            // Returns the new cart (and ids)
            cb(newCart);
        });

    }, userId)
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
