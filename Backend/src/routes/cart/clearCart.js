const { clearCart } = require('../../core/cart');

module.exports = async(req, res) => {
    clearCart(data => {
        res.status(200).send(data);
    }, req.body.cartId)
}