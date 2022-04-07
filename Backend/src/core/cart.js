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
function getCartByCartId(cartId) {

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
                    client.end(err => {
                        if (err) {
                            console.log('client hit error in disconnection', err.stack)
                        } else {
                            console.log('client disconnected')
                        }
                    });
                    return res.rows;
                }
            })

        }
    })
}

// Helper function to update the given cart
function updateCart(cartId, cart) {
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

                    client.end(err => {
                        if (err) {
                            console.log('client hit error in disconnection', err.stack)
                        } else {
                            console.log('client disconnected')
                        }
                    });

                    return res.rows;
                }
            })

        }
    })


}

// Function to remove the first instance of an item in the given cart
function removeItem(cb, cartId, itemId) {

    // Waits for the helper to get the cart by id
    const cart = await this.getCartByCartId(cartId);

    // Finds the index of the first instance of the item
    let index = cart.indexOf(itemId);

    console.log('old cart: ', cart);
    console.log('found index: ', index);

    //  If the index was found, removes the item
    if(index > -1){
        cart.splice(index, 1);
    }

    // Waits for the update cart function to run
    let newCart =  await this.updateCart(cartId, cart);

    console.log('new cart: ', newCart.items);

    // Returns the new cart (and id)
    cb(newCart);
}

// Function to add a new item to the cart
function addItem(sb, cartId, itemId){

    // Waits for the helper to get the cart by id
    const cart = await this.getCartByCartId(cartId);

    console.log('old cart: ', cart);

    // Adds new item to the array
    cart.push(itemId);

    // Waits for the update cart function to run
    let newCart = await this.updateCart(cartId, cart);

    console.log('new cart: ', newCart.items);

    // Returns the new cart (and id)
    cb(newCart);

}