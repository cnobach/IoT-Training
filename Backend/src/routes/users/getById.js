const { getUserByID } = require('../../core/users');

module.exports = async (req, res) => {
    getUserByID(data => {
        res.status(200).send({message: data});
    }, req.params['id']);
}