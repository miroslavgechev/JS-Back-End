const User = require('../models/User');
const config = require('../config/config');
const jwt = require('../lib/jwtCustom');

exports.getUserByUsername = async (username) => await User.findOne({ username });

exports.getUserByEmail = async (email) => await User.findOne({ email });

exports.register = async (email, firstName, lastName, password, repeatPassword) => {

    //Check if passwords match
    try {
        if (password !== repeatPassword) {
            throw new Error('Passwords don\'t match!');
        }
    }
    catch (error) {
        throw error;
    }

    // Check if email is available
    try {
        const existingUser = await this.getUserByEmail(email);

        if (existingUser) {
            throw new Error('Email is already taken!');
        }

    } catch (error) {
        throw error;
    }

    //Register user
    try {
        const user = new User({ email, firstName, lastName, password });
        await user.save();
        console.log('User registered');

    } catch (error) {
        throw new Error(error);
    }

    try {
        return this.login(email, password);
    } catch (error) {
        throw new Error(error);
    }

}

exports.login = async (email, password) => {
    const user = await this.getUserByEmail(email);

    if (!user) {
        throw new Error('Wrong username or password');
    }

    const passwordIsValid = await user.validatePassword(password);

    if (!passwordIsValid) {
        throw new Error('Wrong username or password');
    }

    const payload = { _id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName };
    const token = await jwt.sign(payload, config.development.SECRET, { expiresIn: '4h' });

    return token;
}