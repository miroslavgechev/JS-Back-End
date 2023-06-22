const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 100
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
    difficultyLevel:{
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    accessories:[{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }

});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;