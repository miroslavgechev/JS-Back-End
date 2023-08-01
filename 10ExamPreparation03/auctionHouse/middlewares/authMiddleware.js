const jwt = require('../lib/jwtCustom');
const config = require('../config/config');

exports.authentication = async (req, res, next) => {
    const token = req.cookies['auth'];

    if (token) {

        try {
            const decodedToken = await jwt.verify(token, config.development.SECRET);

            req.user = decodedToken;
            req.isAuthenticated = true;

            res.locals.user = decodedToken;
            res.locals.isAuthenticated = true;

        } catch (error) {
            res.clearCookie('auth');
            res.status(401);
            res.redirect('/404');
            console.log(error.message);
            return;
        }
    }

    next();
}

exports.isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated) {
        return res.redirect('/login');
    }

    next();
}

exports.isNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated) {
        return res.redirect('/');
    }

    next();
}