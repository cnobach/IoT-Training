const { getItemById } = require('../../core/items')

module.exports = async (req, res) => {
    getItemById(data => {
        if(data == false){
            res.status(500).send('Could not find that Item');
        } else {
            res.status(200).send({message: data})
        }
    }, req.params['id']) 
}