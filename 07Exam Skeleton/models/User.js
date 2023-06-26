const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 5,
        unique: [true, 'Username is already taken.'],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9]+$/.test(v);
            }, message: props => `${props.value} is not a valid username!`
        }
    },

    email: {
        type: String,
        required: true,
        minLength: 5,
        unique: [true, 'Email is already taken.'],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(v);
            }, message: props => `${props.value} is not a valid email!`
        }
    },

    password: {
        type: String,
        required: true,
        minLength: [8, 'Password must be at least 8 characters long.'],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9]+$/.test(v);
            }, message: props => `${props.value} is not a valid password!`
        }
    }
});

userSchema.pre('save', async function (next) {

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();

    } catch (err) {
        console.log(err);
        next(err);
    }

});

userSchema.method('validatePassword', function (password) {
    return bcrypt.compare(password, this.password);
}
);

const User = mongoose.model('User', userSchema);

module.exports = User;