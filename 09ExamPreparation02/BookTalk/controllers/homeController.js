// const Crypto = require('../models/Crypto');

exports.getHomePage = async (req, res) => {

    res.render('home', {});
    console.log('Index Page rendered');
}

exports.getErrorPage = (req, res) => {
    res.render('404', {});
    console.log('Error Page rendered');
}
