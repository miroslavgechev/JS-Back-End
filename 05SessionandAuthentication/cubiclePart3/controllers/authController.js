const authService = require('../services/authService');

exports.getRegister = (req, res) => {
    res.render('register');
}

exports.postRegister = async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        return res.redirect('/404');
    }

    const existingUser = await authService.getUserByUsername(username);

    if (existingUser) {
        return res.redirect('/404');
    }

    authService.register(username, password);

    console.log('User registered')

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
        console.log(err);
        return res.redirect('/404');
    }

    console.log('User logged in')
    res.redirect('/');
}

exports.getLogout = (req, res) => {
    res.clearCookie('auth');
    
    console.log('User logged out!')
    res.redirect('/');
}