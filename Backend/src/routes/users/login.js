const { login } = require('../../core/users');

module.exports = async (req, res) => {
    login(data => {

        if(data != false){
            res.status(200).send({userId: data})
        } else {
            res.status(200).send(false)
        }
        
    }, req.body);
}