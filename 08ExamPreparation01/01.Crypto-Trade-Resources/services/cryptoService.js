const Crypto = require('../models/Crypto');

exports.getOne = (id) => Crypto.findById(id).lean();

exports.update = (id, data) => Crypto.findByIdAndUpdate(id, data, { runValidators: true });

exports.deleteElement = async (id) => {
    try {
        await Crypto.findByIdAndDelete(id)
    } catch (error) { throw new Error(error); }
};