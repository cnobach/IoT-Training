const { getItemById } = require('../../core/items')

module.exports = async (req, res) => {
    getItemById(data => {
        res.status(200).send({message: data})
    }, req.params['id']) 
}