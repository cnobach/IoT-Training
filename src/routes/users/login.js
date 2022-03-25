const { login } = require('../../core/users');

module.exports = async (req, res) => {
    login(data => {

        if(data){
            res.status(200).send('Logged in')
        } else {
            res.status(200).send('Not authorized')
        }
        
    }, req.body);
}