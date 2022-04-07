const { getUserCart } = require('../../core/cart');

module.exports = async (req, res) => {
    getUserCart(data => {
        res.status(200).send(data)
    }, req.params['id']);
}