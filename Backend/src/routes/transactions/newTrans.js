const { newTrans } = require('../../core/transactions.js');

module.exports = async (req, res) => {
    newTrans(data => {
        if(data == false){
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send(data);
        }
    }, req.body)
}