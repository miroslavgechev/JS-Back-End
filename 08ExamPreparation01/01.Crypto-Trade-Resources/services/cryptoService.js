const Crypto = require('../models/Crypto');

exports.getOne = (id) => Crypto.findById(id).lean();

exports.update = async (id, data) => {
    try {
        await Crypto.findByIdAndUpdate(id, data, { runValidators: true });
    } catch (error) {
        throw new Error(error);
    }
}

exports.deleteElement = async (id) => {
    try {
        await Crypto.findByIdAndDelete(id)
    } catch (error) { throw new Error(error); }
};