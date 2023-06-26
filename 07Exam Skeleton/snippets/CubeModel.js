const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9 ]+$/.test(v);
            }, message: props => `${props.value} is not a valid name!`
        }
    },
    description: {
        type: String,
        required: true,
        minLength: 20,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9 ]+$/.test(v);
            }, message: props => `${props.value} is not a valid description!`
        }
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v.startsWith('http://') || v.startsWith('https://');
            },
            message: prop => `${prop} value is invalid URL!`
        }
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }

});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;