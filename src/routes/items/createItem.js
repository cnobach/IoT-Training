const { createItem } = require('../../core/items')

module.exports = async(req, res) => {
    createItem(data => {
        res.status(200).send({message: data})
    }, req.body)
}