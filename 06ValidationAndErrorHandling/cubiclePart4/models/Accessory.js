const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
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
    description: {
        type: String,
        required: true,
        minLength: 20,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9 ]+$/.test(v);
            }, message: props => `${props.value} is not a valid description!`
        }
    }
})

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;