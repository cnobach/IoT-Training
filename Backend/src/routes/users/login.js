const { login } = require('../../core/users');

module.exports = async (req, res) => {
    login(data => {

        if(data){
            res.status(200).send(true)
        } else {
            res.status(200).send(false)
        }
        
    }, req.body);
}