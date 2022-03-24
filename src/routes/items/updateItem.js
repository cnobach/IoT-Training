const { updateItem } = require('../../core/items');

module.exports = async (req, res) => {
    updateItem(data => {
        res.status(200).send({message: data})
    }, req.body)
}