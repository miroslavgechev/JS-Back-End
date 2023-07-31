const Book = require('../models/Book');

exports.getOne = (id) => Book.findById(id).lean();

exports.update = (id, data) => Book.findByIdAndUpdate(id, data, { runValidators: true });

exports.deleteElement = async (id) => {
    try {
        await Book.findByIdAndDelete(id)
    } catch (error) { throw new Error(error); }
};