const router = require('express').Router()
const pageController = require('../controllers/cubesController');


module.exports = (app) => {
    app.use(router);

    app.get('/', pageController.getHomePage)

    app.get('/about', pageController.getAboutPage)

    app.get('/create', pageController.getCreatePage)
    app.post('/create', pageController.postCreatePage)

    app.get('/details/:id', pageController.getDetailsPage)

    app.get('*', pageController.getErrorPage)
};