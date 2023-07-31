const router = require('express').Router();

//Add Controllers
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const bookContoller = require('../controllers/bookController');

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

    app.get('/create', isAuthenticated, bookContoller.getCreate)
    app.post('/create', isAuthenticated, bookContoller.postCreate)

    app.get('/catalog', bookContoller.getCatalog);

    app.get('/details/:id', bookContoller.getDetails);

    app.get('/wish/:id', isAuthenticated, bookContoller.getWishBook);

    app.get('/edit/:id', isAuthenticated, bookContoller.getEdit);
    app.post('/edit/:id', isAuthenticated, bookContoller.postEdit);

    app.get('/delete/:id', isAuthenticated, bookContoller.getDelete);

    app.get('/profile', isAuthenticated, bookContoller.getProfile);

    app.get('*', homeController.getErrorPage);

};