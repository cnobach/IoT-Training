const { getAllItems } = require('../../core/items')

module.exports = async (req, res) => {
    getAllItems(data => {
        res.status(200).send({message: data})
    })
}