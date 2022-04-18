const { updateUser } = require('../../core/users');

module.exports = async (req, res) => {
    updateUser(data => {
        if(data == false){
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Sent after update: ', data);
            res.status(200).send(data)
        }
    }, req.body)
}