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

    app.get('/create', isAuthenticated, cryptoController.getCreate)
    app.post('/create', isAuthenticated, cryptoController.postCreate)


    // app.get('/create/cube', isAuthenticated, cubeController.getCreateCube)
    // app.post('/create/cube', isAuthenticated, cubeController.postCreateCube)

    // app.get('/details/:cubeId', cubeController.getDetailsPage)

    // app.get('/edit/:cubeId', isAuthenticated, cubeController.getEditCube);
    // app.post('/edit/:cubeId', isAuthenticated, cubeController.postEditCube);

    // app.get('/delete/:cubeId', isAuthenticated, cubeController.getDeleteCube);
    // app.post('/delete/:cubeId', isAuthenticated, cubeController.postDeleteCube);

    // app.get('/attach/accessory/:cubeId', isAuthenticated, accessoryController.getAttachAccessory);
    // app.post('/attach/accessory/:cubeId', isAuthenticated, accessoryController.postAttachAccessory);


    // app.get('*', cubeController.getErrorPage)

};