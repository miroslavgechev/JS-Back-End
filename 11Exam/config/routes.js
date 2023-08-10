const router = require('express').Router();

//Add Controllers
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const creaturesController = require('../controllers/creaturesController');

//Add Middlewares
const { isAuthenticated, isNotAuthenticated } = require('../middlewares/authMiddleware');

module.exports = (app) => {

    app.use(router);

    app.get('/', homeController.getHomePage)

    app.get('/register', isNotAuthenticated, authController.getRegister);
    app.post('/register', isNotAuthenticated, authController.postRegister);

    app.get('/login', isNotAuthenticated, authController.getLogin);
    app.post('/login', isNotAuthenticated, authController.postLogin);

    app.get('/logout', isAuthenticated, authController.getLogout);

    app.get('/create', isAuthenticated, creaturesController.getCreate)
    app.post('/create', isAuthenticated, creaturesController.postCreate)

    // app.get('/catalog', cryptoController.getCatalog);

    // app.get('/details/:id', cryptoController.getDetails);

    // app.get('/buy/:id', isAuthenticated, cryptoController.getBuyCoin);

    // app.get('/edit/:id', isAuthenticated, cryptoController.getEdit);
    // app.post('/edit/:id', isAuthenticated, cryptoController.postEdit);

    // app.get('/delete/:id', isAuthenticated, cryptoController.getDelete);

    // app.get('/search', cryptoController.getSearch);

    // app.get('*', homeController.getErrorPage);

};