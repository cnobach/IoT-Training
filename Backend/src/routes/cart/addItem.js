const { addItem } = require('../../core/cart');

module.exports = async (req, res) => {
    addItem(data => {
        console.log('\nDATA INSIDE ADD ITEM: ', data)
        res.status(200).send(data);
    }, req.body.userId, req.body.itemId)
}