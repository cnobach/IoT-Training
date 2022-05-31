const { deleteItem } = require('../../core/items')

module.exports = async (req, res) => {
    deleteItem(data => {
        if(data == false){
            res.status(200).send({message: data})
        } else {
            res.status(200).send({message: data})
        }
    }, req.params['id'])
}