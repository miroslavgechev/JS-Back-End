const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: [true, 'Crypto already added.'],
        minLength: [2, 'Name must be at least 2 characters long.'],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9 ]+$/.test(v);
            }, message: props => `${props.value} is not a valid name!`
        }
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v.startsWith('http://') || v.startsWith('https://');
            },
            message: prop => `${prop} value is invalid URL!`
        }
    },

    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be a positive number.']
    },

    description: {
        type: String,
        required: true,
        minLength: 10,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9 ]+$/.test(v);
            }, message: props => `${props.value} is not a valid description!`
        }
    },

    paymentMethod: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'].includes(v.toLowerCase());
            }, message: props => `${props.value} is not a valid payment method!`
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