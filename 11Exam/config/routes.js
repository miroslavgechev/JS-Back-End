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

    app.get('/catalog', creaturesController.getCatalog);

    app.get('/details/:id', creaturesController.getDetails);

    app.get('/vote/:id', isAuthenticated, creaturesController.getVote);

    app.get('/edit/:id', isAuthenticated, creaturesController.getEdit);
    app.post('/edit/:id', isAuthenticated, creaturesController.postEdit);

    app.get('/delete/:id', isAuthenticated, creaturesController.getDelete);

    app.get('/profile', isAuthenticated, creaturesController.getProfile);

    app.get('*', homeController.getErrorPage);

};