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
                return /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(v);
            }, message: props => `${props.value} is not a valid email!`
        }
    },
    username: {
        type: String,
        required: true,
        minLength: [4, 'Username must be at least 4 characters long.'],
        unique: [true, 'Username is already taken.']
    },
    password: {
        type: String,
        required: true,
        minLength: [3, 'Password must be at least 3 characters long.'],
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