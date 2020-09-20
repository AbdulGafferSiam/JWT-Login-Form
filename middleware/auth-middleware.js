const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    // grab jwt token from cookie
    const token = req.cookies.jwt;

    // check json web token exist & is varified
    if (token) {
        jwt.verify(token, 'anySecret', (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        });
    }
    else {
        res.redirect('/login');
    }
}

module.exports = { requireAuth };