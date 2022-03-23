const { getAllUsers } = require('../core/users');

/**
 * Calls the getAllUsers function and sends the required response
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
module.exports = async (req, res) => {
    getAllUsers(data => {
        res.status(200).send({message: data})
    })
}