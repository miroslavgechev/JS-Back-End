const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
        maxLength: 100
    }
})

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;