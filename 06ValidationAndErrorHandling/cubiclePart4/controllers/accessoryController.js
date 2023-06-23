const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

exports.getCreateAccessory = (req, res) => {
    res.render('createAccessory');
    console.log('Create Accessory Page rendered');
}

exports.postCreateAccessory = async (req, res) => {
    const { name, description, imageUrl } = req.body;

    try {
        await Accessory.create({ name, description, imageUrl });

    } catch (err) {
        console.log(err.message);
        return res.redirect('/404');
    }

    console.log('New accessory created');

    res.redirect('/');
}

exports.getAttachAccessory = async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId).lean();
    const accessories = await Accessory.find({ _id: { $nin: cube.accessories } }).lean();

    res.render('attachAccessory', { cube, accessories });

    console.log('Attach Accessory Page rendered');
}

exports.postAttachAccessory = async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId);
    const accessoryId = req.body.accessory;

    cube.accessories.push(accessoryId);
    await cube.save();

    res.redirect(`/details/${cube._id}`)
}