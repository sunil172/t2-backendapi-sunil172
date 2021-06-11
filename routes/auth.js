const jwt = require('jsonwebtoken');

function verifyUser (req, res, next) {
    let authHeader = req.headers.authorization; 
    if (!authHeader) {
        let err = new Error('Authentication Error !');
        err.status = 401; 
        return next(err);
    }
        let token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.SECRET, (err, payload) => {
        if(err) {
            let err = new Error('Token could not be verified!');
            err.status = 401; 
            return next(err);
        }
        req.user = payload; 
        console.log(payload);
        next();
        })
        
}

function verifyBasic (req, res, next) {
    if (req.user) {
        let err = new Error('Unauthorization Information!');
        err.status = 401; 
        return next(err);
    }
    else if (req.user.role == 'basic') {
        let err = new Error('Forbidden');
        err.status = 403; 
        return next(err);
    }
    next();
}

function verfiyAdmin (req, res, next) {
    if (!req.user) {
        let err = new Error ('No authentication information');
        err.status = 401; 
        return next(err);
    }
    else if (req.user.role != 'admin') {
        let err = new Error('Forbidden!');
        err.status = 403; 
        return next(err);
    }
    next();
}

module.exports = {verifyUser, verifyBasic, verfiyAdmin}