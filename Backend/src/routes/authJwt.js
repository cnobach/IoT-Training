const jwt = require('jsonwebtoken');

// Authenticate JWT
function authJwt(req, res, next){
    const token = req.cookies.token;
    if(token){
        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if(err){
                res.cookie('token', '');
                return res.status(401).send('Authentication Error');
            }
            next();
        })
    } else {
        res.status(403).send('Unauthorized');
    }
}

module.exports = authJwt;