const { createCart } = require('../../core/cart');

module.exports = async(req, res) => {
    createCart(data => {
        res.status(200).send(data);
    }, req.body.userId)
}