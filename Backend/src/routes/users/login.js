const { login } = require('../../core/users');

module.exports = async (req, res) => {
    login(data => {

        if(data != false){
            res.cookie('token', data.token, {httpOnly: true})
            res.status(200).send({userId: data.userId, token: data.token})
        } else {
            res.status(200).send(false)
        }
        
    }, req.body);
}