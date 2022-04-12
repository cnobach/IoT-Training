const { createUser } = require('../../core/users');

module.exports = async (req, res) => {
    createUser(data => {
        if(data == false){
            res.status(500).send('Internal Server Error');
        } else {
            res.status(201).send({message: data})
        }
    }, req.body)
}