const Creature = require('../models/creature');
const { getErrorMessage } = require('../utils/getErrorMessage');


exports.getCreate = (req, res) => {
    res.render('create');
    console.log('Create page rendered');
}

exports.postCreate = async (req, res) => {
    const { name, species, skinColor, eyeColor, imageUrl, description } = req.body;
    const owner = req.user._id;

    try {
        const creature = new Creature({ name, species, skinColor, eyeColor, imageUrl, description, owner  });
        await creature.save();
        console.log('Creature created');

    } catch (error) {
        return res.render('create', { error: getErrorMessage(error) });
    }

    res.redirect('/catalog');
}