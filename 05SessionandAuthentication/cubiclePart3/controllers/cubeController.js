const Cube = require('../models/Cube');
const cubeService = require('../services/cubeService');
const cubeUtils = require('../utils/cubeUtils');

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
        return res.redirect('/404');
    }

    console.log('Create Page form processed');
    res.redirect('/');
}

exports.getDetailsPage = async (req, res) => {
    let cubeId = req.params.cubeId;
    const cube = await Cube.findById(cubeId).populate('accessories').lean();

    if (!cube) {
        return res.redirect('/404');
    }

    const isOwner = cubeUtils.isOwner(req.user, cube);

    res.render('details', { cube, isOwner })
    console.log('Details Page rendered');
}

exports.getEditCube = async (req, res) => {
    const cubeId = req.params.cubeId;
    const cube = await cubeService.getOne(cubeId);
    const difficultyLevels = cubeUtils.generateDifficultyLevels(cube.difficultyLevel);

    if (!cube || !cubeUtils.isOwner(req.user, cube)) {
        return res.redirect('/404');
    }

    console.log('Edit cube rendered')

    res.render('editCube', { cube, difficultyLevels });
}

exports.postEditCube = async (req, res) => {
    const { _id, name, description, imageUrl, difficultyLevel } = req.body;
    const cubeId = req.params.cubeId;

    await cubeService.update(cubeId, { _id, name, description, imageUrl, difficultyLevel });

    console.log('Cube info updated')
    res.redirect(`/details/${cubeId}`);
}

exports.getDeleteCube = async (req, res) => {
    const cubeId = req.params.cubeId;
    const cube = await cubeService.getOne(cubeId);
    const difficultyLevels = cubeUtils.generateDifficultyLevels(cube.difficultyLevel);

    if (!cube || !cubeUtils.isOwner(req.user, cube)) {
        return res.redirect('/404');
    }

    console.log('Delete cube rendered')

    res.render('deleteCube', { cube, difficultyLevels });
}

exports.postDeleteCube = async (req, res) => {
    const cubeId = req.params.cubeId;

    await cubeService.delete(cubeId);

    console.log('Cube deleted')
    res.redirect('/');
}

exports.getErrorPage = (req, res) => {
    res.render('404');
    console.log('Error Page rendered');
}