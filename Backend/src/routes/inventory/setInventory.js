const { setInventory } = require('../../core/inventory');

module.exports = async (req, res) => {
    setInventory(data => {
        if(data == false){
            res.status(500).send(false);
        } else {
            res.status(200).send(true)
        }
    }, req.params['id'], req.body)
}