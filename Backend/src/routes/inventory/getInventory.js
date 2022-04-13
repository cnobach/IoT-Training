const { getInventory } = require('../../core/inventory');

module.exports = async (req, res) => {
    getInventory(data => {
        if(data == false){
            res.status(500).send('Internal Server Error');
        } else {
            body = {
                amount: data
            }
            res.status(200).send(body)
        }
    }, req.params['id'])
}