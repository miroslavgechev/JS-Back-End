const router = require('express').Router();

//Add Controllers
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const auctionController = require('../controllers/auctionController');

//Add Middlewares
const { isAuthenticated, isNotAuthenticated } = require('../middlewares/authMiddleware');

module.exports = (app) => {

    app.use(router);

    app.get('/', homeController.getHomePage)

    app.get('/register', isNotAuthenticated, authController.getRegister);
    app.post('/register', isNotAuthenticated,authController.postRegister);

    app.get('/login',isNotAuthenticated, authController.getLogin);
    app.post('/login', isNotAuthenticated, authController.postLogin);

    app.get('/logout', isAuthenticated, authController.getLogout);

    app.get('/create', isAuthenticated, auctionController.getCreate)
    app.post('/create', isAuthenticated, auctionController.postCreate)

    app.get('/browse', auctionController.getBrowse);

    app.get('/details/:id', auctionController.getDetails);

    app.post('/bid/:id', isAuthenticated, auctionController.postBid);

    app.get('/edit/:id', isAuthenticated, auctionController.getEdit);
    app.post('/edit/:id', isAuthenticated, auctionController.postEdit);

    app.get('/delete/:id', isAuthenticated, auctionController.getDelete);

    app.get('/close/:id', isAuthenticated, auctionController.getClose);

    app.get('/profile', isAuthenticated, auctionController.getProfile)

    app.get('*', homeController.getErrorPage);

};