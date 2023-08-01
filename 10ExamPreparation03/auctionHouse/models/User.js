const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: [10, 'Email must be at least 10 characters long.'],
        unique: [true, 'Email is already taken.'],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/.test(v);
            }, message: props => `${props.value} is not a valid email!`
        }
    },

    password: {
        type: String,
        required: true,
        minLength: [5, 'Password must be at least 5 characters long.'],
    },

    firstName: {
        type: String,
        required: true,
        minLength: [1, 'First name must be at least 1 character long.']
    },

    lastName:{
        type: String,
        required: true,
        minLength: [1, 'First name must be at least 1 character long.']
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