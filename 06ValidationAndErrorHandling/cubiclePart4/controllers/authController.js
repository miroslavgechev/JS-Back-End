const authService = require('../services/authService');
const { parseMongooseError } = require('../utils/parseMongooseError');

exports.getRegister = (req, res) => {
    res.render('register');
}

exports.postRegister = async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        return res.render('register', { error: 'Passwords don\'t match!' });
    }

    try {
        const existingUser = await authService.getUserByUsername(username);

        if (existingUser) {
            return res.render('register', { error: 'Username is already taken!' });
        }

    } catch (err) {
        const error = parseMongooseError(err)[0];
        return res.render('register', { error });
    }

    try {
        authService.register(username, password);
        console.log('User registered')

    } catch (err) {
        const error = parseMongooseError(err)[0];
        return res.render('register', { error });
    }

    res.redirect('/login');
}

exports.getLogin = (req, res) => {
    res.render('login');
    console.log('Login page rendered')
}

exports.postLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await authService.login(username, password);
        res.cookie('auth', token, { httpOnly: true });

    } catch (err) {
        return res.render('login', { error: 'Wrong username or password!' });
    }

    console.log('User logged in')
    res.redirect('/');
}

exports.getLogout = (req, res) => {
    res.clearCookie('auth');

    console.log('User logged out!')
    res.redirect('/');
}