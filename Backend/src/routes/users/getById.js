const { getUserByID } = require('../../core/users');

module.exports = async (req, res) => {
    getUserByID(data => {
        if(data == false){
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send({message: data})
        }
    }, req.params['id']);
}