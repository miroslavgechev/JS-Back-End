// const Cube = require('../snippets/CubeModel');
const Crypto = require('../models/Crypto');

exports.getHomePage = async (req, res) => {

    res.render('home', {});
    console.log('Index Page rendered');
}
