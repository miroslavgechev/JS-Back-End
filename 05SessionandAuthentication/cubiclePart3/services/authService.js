const User = require('../models/User');
const config = require('../config/config');
const jwt = require('../lib/jwtCustom');

exports.getUserByUsername = async (username) => await User.findOne({ username });

exports.register = (username, password) => {
    const user = new User({ username, password });
    user.save();
}

exports.login = async (username, password) => {
    const user = await this.getUserByUsername(username);
    const passwordIsValid = await user.validatePassword(password);

    if (!user || !passwordIsValid) {
        throw 'Wrong username or password';
    }

    const payload = { _id: user._id, username: user.username };
    const token = await jwt.sign(payload, config.development.SECRET, { expiresIn: '1h'});

    return token;
}