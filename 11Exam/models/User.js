const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: [10, 'Email must be at least 10 characters long.'],
        unique: [true, 'Email is already taken.'],
    },

    password: {
        type: String,
        required: true,
        minLength: [4, 'Password must be at least 4 characters long.'],
    },

    firstName: {
        type: String,
        required: true,
        minlength: [3, 'First name must be at least 3 characters long.'],
    },

    lastName: {
        type: String,
        required: true,
        minlength: [3, 'Last name must be at least 3 characters long.'],
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