const { removeItem } = require('../../core/cart');

module.exports = async (req, res) => {
    removeItem(data => {
        res.status(200).send(data)
    }, req.body.cartId, req.body.itemId);
}