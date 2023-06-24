const router = require('express').Router();

const homeController = require('../controllers/homeController');
const cubeController = require('../controllers/cubeController');
const accessoryController = require('../controllers/accessoryController');
const authController = require('../controllers/authController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

module.exports = (app) => {
    app.use(router);

    app.get('/', homeController.getHomePage)
    app.get('/about', homeController.getAboutPage)

    app.get('/create/cube', isAuthenticated, cubeController.getCreateCube)
    app.post('/create/cube', isAuthenticated, cubeController.postCreateCube)

    app.get('/details/:cubeId', cubeController.getDetailsPage)

    app.get('/create/accessory', isAuthenticated, accessoryController.getCreateAccessory);
    app.post('/create/accessory', isAuthenticated, accessoryController.postCreateAccessory);

    app.get('/edit/:cubeId', isAuthenticated, cubeController.getEditCube);
    app.post('/edit/:cubeId', isAuthenticated, cubeController.postEditCube);

    app.get('/delete/:cubeId', isAuthenticated, cubeController.getDeleteCube);
    app.post('/delete/:cubeId', isAuthenticated, cubeController.postDeleteCube);

    app.get('/attach/accessory/:cubeId', isAuthenticated, accessoryController.getAttachAccessory);
    app.post('/attach/accessory/:cubeId', isAuthenticated, accessoryController.postAttachAccessory);

    app.get('/register', authController.getRegister);
    app.post('/register', authController.postRegister);

    app.get('/login', authController.getLogin);
    app.post('/login', authController.postLogin);

    app.get('/logout', authController.getLogout);

    app.get('*', cubeController.getErrorPage)
};