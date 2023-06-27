const router = require('express').Router();

//Add Controllers
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const cryptoController = require('../controllers/cryptoController');

//Add Middlewares
const { isAuthenticated } = require('../middlewares/authMiddleware');

module.exports = (app) => {

    app.use(router);

    app.get('/', homeController.getHomePage)

    app.get('/register', authController.getRegister);
    app.post('/register', authController.postRegister);

    app.get('/login', authController.getLogin);
    app.post('/login', authController.postLogin);

    app.get('/logout', isAuthenticated, authController.getLogout);

    // app.get('/create', isAuthenticated, cryptoController.getCreate)
    // app.post('/create', isAuthenticated, cryptoController.postCreate)

    // app.get('/catalog', cryptoController.getCatalog);

    // app.get('/details/:id', cryptoController.getDetails);

    // app.get('/buy/:id', isAuthenticated, cryptoController.getBuyCoin);

    // app.get('/edit/:id', isAuthenticated, cryptoController.getEdit);
    // app.post('/edit/:id', isAuthenticated, cryptoController.postEdit);

    // app.get('/delete/:id', isAuthenticated, cryptoController.getDelete);

    // app.get('/search', cryptoController.getSearch);

    app.get('*', homeController.getErrorPage);

};