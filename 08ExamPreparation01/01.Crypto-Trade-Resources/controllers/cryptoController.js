const Crypto = require('../models/Crypto');
const { getErrorMessage } = require('../utils/getErrorMessage');

exports.getCreate = (req, res) => {

    res.render('create', {});
    console.log('Create Page rendered');

}

exports.postCreate = async (req, res) => {
    const { name, image, price, description, paymentMethod } = req.body;
    const owner = req.user._id;

    try {
        const currency = new Crypto({ name, image, price, description, paymentMethod, owner });
        await currency.save();

    } catch (error) {
        res.render('create', { error: getErrorMessage(error) });
    }

}