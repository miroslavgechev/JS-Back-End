const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        minLength: [2, 'Name must be at least 2 characters long.']
    },

    species: {
        type: String,
        required: [true, 'Species is required.'],
        minLength: [3, 'Species must be at least 3 characters long.']
    },

    skinColor: {
        type: String,
        required: [true, 'Skin color is required.'],
        minLength: [3, 'Skin color must be at least 3 characters long.']
    },

    eyeColor: {
        type: String,
        required: [true, 'Eye color is required.'],
        minLength: [3, 'Eye color must be at least 3 characters long.']
    },

    imageUrl: {
        type: String,
        required: [true, 'Image URL is required.'],
        validate: {
            validator: function (v) {
                return v.startsWith('http://') || v.startsWith('https://');
            },
            message: prop => `${prop.value} is invalid URL!`
        }
    },

    description: {
        type: String,
        required: [true, 'Description is required.'],
        minLength: [5, 'Description must be at least 5 characters long.'],
        maxLength: [500, 'Description must be maximum 500 characters long.'],
    },

    votes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],

    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Creature = mongoose.model('Creature', cryptoSchema);

module.exports = Creature;
