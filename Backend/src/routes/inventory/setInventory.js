const { setInventory } = require('../../core/inventory');

module.exports = async (req, res) => {
    setInventory(data => {
        if(data == false){
            res.status(500).send('Internal Server Error');
        } else {
            body = {
                amount: data
            }
            res.status(200).send(body)
        }
    }, req.params['id'], req.body)
}