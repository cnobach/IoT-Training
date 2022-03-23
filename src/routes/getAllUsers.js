const { getAllUsers } = require('../core/users');

module.exports = async (req, res) => {
    getAllUsers(data => {
        res.status(200).send({message: data})
    })
}