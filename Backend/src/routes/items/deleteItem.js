const { deleteItem } = require('../../core/items')
const createItem = require('./createItem')

module.exports = async (req, res) => {
    deleteItem(data => {
        res.status(200).send({message: data})
    }, req.params['id'])
}