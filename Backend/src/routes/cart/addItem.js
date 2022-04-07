const { addItem } = require('../../core/cart');

module.exports = async (req, res) => {

    console.log('body', req.body);

    addItem(data => {
        res.status(200).send(data);
    }, req.body.userId, req.body.itemId)
}