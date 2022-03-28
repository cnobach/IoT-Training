const { createItem } = require('../../core/items')

module.exports = async(req, res) => {
    createItem(data => {
        res.status(201).send({message: data})
    }, req.body)
}