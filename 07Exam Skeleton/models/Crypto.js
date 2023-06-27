const mongoose = require('mongoose');
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