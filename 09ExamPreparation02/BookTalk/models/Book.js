const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Title is required.'],
        minLength: [2, 'Title must be at least 2 characters long.'],
    },
    author: {
        type: String,
        required: [true, 'Author is required.'],
        minLength: [5, 'Author must be at least 5 characters long.'],
    },
    image: {
        type: String,
        required: [true, 'Image is required.'],
        validate: {
            validator: function (v) {
                return v.startsWith('http://') || v.startsWith('https://');
            },
            message: prop => `${prop} value is invalid URL!`
        }
    },
    bookReview: {
        type: String,
        required: [true, 'Book review is required.'],
        minLength: [ 10, 'Book review must be at least 10 characters long.' ]
    },
    genre: {
        type: String,
        required: [true, 'Genre is required.'],
        minLength: [3, 'Genre must be at least 3 characters long.' ]
    },
    stars: {
        type: Number,
        required: [true, 'Stars are required.'],
        min: [1, 'Stars must be between 1 and 5.'],
        max: [5, 'Stars must be between 1 and 5.'],
        validate: {
            validator: Number.isInteger,
        }
    },
    wishList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Books = mongoose.model('Book', bookSchema);

module.exports = Books;

/*
const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        unique: [true, 'Crypto already added.'],
        minLength: [2, 'Name must be at least 2 characters long.']
    },
    image: {
        type: String,
        required: [true, 'Image URL is required.'],
        validate: {
            validator: function (v) {
                return v.startsWith('http://') || v.startsWith('https://');
            },
            message: prop => `${prop} value is invalid URL!`
        }
    },

    price: {
        type: Number,
        required: [true, 'Price is required.'],
        min: [0, 'Price must be a positive number.']
    },

    description: {
        type: String,
        required: true,
        minLength: 10
    },

    paymentMethod: {
        type: String,
        required: true,
        enum: {
            values: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
            message: 'Payment method is invalid.'
        }
    },

    buyer: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],

    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;
 */