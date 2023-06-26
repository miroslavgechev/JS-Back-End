const authService = require('../services/authService');
const { getErrorMessage } = require('../utils/getErrorMessage');

exports.getRegister = (req, res) => {
    res.render('register');
    console.log('Register page rendered');
}

exports.postRegister = async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;

    //Register user
    try {
        const token = await authService.register(username, email, password, repeatPassword);
        res.cookie('auth', token, { httpOnly: true });
        res.redirect('/');

        console.log('User logged in');

    } catch (error) {
        return res.render('register', { error: getErrorMessage(error) });
    }
}

exports.getLogin = (req, res) => {
    res.render('login');
    console.log('Login page rendered');
}

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);
        res.cookie('auth', token, { httpOnly: true });
        res.redirect('/');

        console.log('User logged in')

    } catch (error) {
        return res.render('login', { error: getErrorMessage(error) });
    }
}

exports.getLogout = (req, res) => {
    res.clearCookie('auth');

    console.log('User logged out');

    res.redirect('/');
}