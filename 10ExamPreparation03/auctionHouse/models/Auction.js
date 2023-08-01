const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required.'],
        minLength: [4, 'Title must be at least 4 characters long.']
    },
    description: {
        type: String,
        maxLength: [200, 'Description must be less than 200 characters long.']
    },

    category: {
        type: String,
        required: [true, 'Category is required.'],
        enum: {
            values: ['estate', 'vehicles', 'furniture', 'electronics', 'other'],
            message: 'Category is invalid.'
        }
    },

    imageUrl: {
        type: String
    },

    price: {
        type: Number,
        required: [true, 'Price is required.'],
        min: [0, 'Price must be a positive number.']
    },

    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },

    bidder: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },

    closed: {
        type: Boolean,
        default: false
    }



});

const Auction = mongoose.model('Auction', cryptoSchema);

module.exports = Auction;
