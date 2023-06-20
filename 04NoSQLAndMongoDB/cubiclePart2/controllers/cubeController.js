const Cube = require('../models/Cube');

exports.getCreateCube = (req, res) => {
    res.render('createCube');
    console.log('Create Page rendered');
}

exports.postCreateCube = (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;

    let cube = new Cube({name, description, imageUrl, difficultyLevel});
    cube.save();

    console.log('Create Page form processed');
    res.redirect('/');
}

exports.getDetailsPage = async (req, res) => {
    let cubeId = req.params.cubeId;
    const cube = await Cube.findById(cubeId).populate('accessories').lean();

    if (!cube) {
        return res.redirect('/404');
    }

    res.render('details', { cube })
    console.log('Details Page rendered');
}

exports.getErrorPage = (req, res) => {
    res.render('404');
    console.log('Error Page rendered');
}