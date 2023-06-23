const Cube = require('../models/Cube');
const cubeService = require('../services/cubeService');
const cubeUtils = require('../utils/cubeUtils');
const { parseMongooseError } = require('../utils/parseMongooseError');

exports.getCreateCube = (req, res) => {
    res.render('createCube');
    console.log('Create Page rendered');
}

exports.postCreateCube = async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;
    const owner = req.user._id;

    try {
        let cube = new Cube({ name, description, imageUrl, difficultyLevel, owner });
        await cube.save();
    }
    catch (err) {
        console.log(err.message);
        return res.render('createCube', { error: 'Cube details are not valid!' });
    }

    console.log('Create Page form processed');
    res.redirect('/');
}

exports.getDetailsPage = async (req, res) => {
    let cubeId = req.params.cubeId;
    const cube = await Cube.findById(cubeId).populate('accessories').lean();

    if (!cube) {
        return res.render('/', { error: 'No such cube in database!' });
    }

    const isOwner = cubeUtils.isOwner(req.user, cube);

    res.render('details', { cube, isOwner })
    console.log('Details Page rendered');
}

exports.getEditCube = async (req, res) => {
    const cubeId = req.params.cubeId;
    const cube = await cubeService.getOne(cubeId);
    const difficultyLevels = cubeUtils.generateDifficultyLevels(cube.difficultyLevel);

    if (!cube) {
        return res.render('/', { error: 'No such cube in database!' });
    }

    if (!cubeUtils.isOwner(req.user, cube)) {
        return res.render('/', { error: 'You\'re not an owner' });
    }

    console.log('Edit cube rendered')

    res.render('editCube', { cube, difficultyLevels });
}

exports.postEditCube = async (req, res) => {
    const { _id, name, description, imageUrl, difficultyLevel } = req.body;
    const cubeId = req.params.cubeId;

    try {
        await cubeService.update(cubeId, { _id, name, description, imageUrl, difficultyLevel });

    } catch (err) {
        const error = parseMongooseError(err)[0]
        return res.render(`/details/${cubeId}`, { error });
    }

    console.log('Cube info updated')
    res.redirect(`/details/${cubeId}`);
}

exports.getDeleteCube = async (req, res) => {
    const cubeId = req.params.cubeId;
    const cube = await cubeService.getOne(cubeId);
    const difficultyLevels = cubeUtils.generateDifficultyLevels(cube.difficultyLevel);

    if (!cube) {
        return res.render('/', { error: 'No such cube in database!' });
    }

    if (!cubeUtils.isOwner(req.user, cube)) {
        return res.render('/', { error: 'You\'re not an owner' });
    }

    console.log('Delete cube rendered')

    res.render('deleteCube', { cube, difficultyLevels });
}

exports.postDeleteCube = async (req, res) => {
    const cubeId = req.params.cubeId;

    try {
        await cubeService.delete(cubeId);
    }
    catch (err) {
        const error = parseMongooseError(err)[0];
        return res.render(`/details/${cubeId}`, { error });
    }

    console.log('Cube deleted')
    res.redirect('/');
}

exports.getErrorPage = (req, res) => {
    res.render('404');
    console.log('Error Page rendered');
}