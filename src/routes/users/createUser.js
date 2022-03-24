const { createUser } = require('../../core/users');

module.exports = async (req, res) => {
    createUser(data => {
        res.status(201).send({message: data})
    }, req.body)
}