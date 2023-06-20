const router = require('express').Router();

const homeController = require('../controllers/homePageController');
const cubeController = require('../controllers/cubeController');
const accessoryController = require('../controllers/accessoryController');

module.exports = (app) => {
    app.use(router);

    app.get('/', homeController.getHomePage)
    app.get('/about', homeController.getAboutPage)

    app.get('/create/cube', cubeController.getCreateCube)
    app.post('/create/cube', cubeController.postCreateCube)

    app.get('/details/:cubeId', cubeController.getDetailsPage)

    app.get('/create/accessory', accessoryController.getCreateAccessory);
    app.post('/create/accessory', accessoryController.postCreateAccessory);

    app.get('/attach/accessory/:cubeId', accessoryController.getAttachAccessory);
    app.post('/attach/accessory/:cubeId', accessoryController.postAttachAccessory);

    app.get('*', cubeController.getErrorPage)
};