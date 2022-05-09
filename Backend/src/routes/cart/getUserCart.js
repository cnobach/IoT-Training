const { getUserCart } = require('../../core/cart');

module.exports = async (req, res) => {
    getUserCart(data => {
        if(data == false){
            res.status(500).send('Internal server error')
        } else {
            res.status(200).send(data)
        }
    }, req.params['id']);
}