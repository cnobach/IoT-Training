const { deleteUser } = require('../../core/users');

module.exports = async (req, res) => {
    deleteUser(data => {
        res.status(200).send({message: data})
    }, req.params['id']);
}