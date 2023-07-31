const User = require('../models/User');
const config = require('../config/config');
const jwt = require('../lib/jwtCustom');

exports.getUserByUsername = async (username) => await User.findOne({ username });

exports.getUserByEmail = async (email) => await User.findOne({ email });

exports.register = async (username, email, password, repeatPassword) => {

    //Check if passwords match
    try {
        if (password !== repeatPassword) {
            throw new Error('Passwords don\'t match!');
        }
    }
    catch (error) {
        throw error;
    }

    //Check if username is available
    try {
        const existingUser = await this.getUserByUsername(username);

        if (existingUser) {
            throw new Error('Username is already taken!');
        }

    } catch (error) {
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
        const user = new User({ username, email, password });
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

    const payload = { _id: user._id, username: user.username, email: user.email };
    const token = await jwt.sign(payload, config.development.SECRET, { expiresIn: '1h' });

    return token;
}