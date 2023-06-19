let db = require('../config/database.json');
const Cube = require('../models/CubeClass');

exports.getHomePage = (req, res) => {

    let cubes = [...db];

    const { search, from: difficultyFrom, to: difficultyTo } = req.query;

    if (search) {
        cubes = cubes.filter(cube => cube.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    }

    if (difficultyFrom) {
        cubes = cubes.filter(cube => cube.difficultyLevel >= difficultyFrom);
    }

    if (difficultyTo) {
        cubes = cubes.filter(cube => cube.difficultyLevel <= difficultyTo);
    }

    res.render('index', { cubes, search, difficultyFrom, difficultyTo });
    console.log('Index Page rendered');
}

exports.getAboutPage = (req, res) => {
    res.render('about');
    console.log('About Page rendered');
}

exports.getCreatePage = (req, res) => {
    res.render('create');
    console.log('Create Page rendered');
}

exports.postCreatePage = (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;

    let cube = new Cube(name, description, imageUrl, difficultyLevel);
    cube.save();

    console.log('Create Page form processed');
    res.redirect('/');
}

exports.getDetailsPage = (req, res) => {
    let id = Number(req.params.id);
    if (!id) {
        return res.redirect('/404');
    }

    const cube = db.find(cube => cube.id === id);

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