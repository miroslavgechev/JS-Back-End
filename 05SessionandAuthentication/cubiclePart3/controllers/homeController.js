const Cube = require('../models/Cube');

exports.getHomePage = async (req, res) => {

    const { search, from: difficultyFrom, to: difficultyTo } = req.query;

    let cubes = await Cube.find().lean();

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