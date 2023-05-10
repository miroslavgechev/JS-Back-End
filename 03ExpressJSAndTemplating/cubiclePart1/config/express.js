const express = require('express');
const handlebars = require('express-handlebars');
//const bodyParser = require('body-parser');

module.exports = (app) => {

    //Setup the view engine
    app.set('view engine', 'hbs');
    app.engine('hbs', handlebars.engine({
        extname: 'hbs'
    }))

    //Setup the body parser
    app.use(express.urlencoded({extended: false}));
    //app.use(bodyParser.urlencoded({extended: false}))

    //Setup the static files
    app.use(express.static('static'));
};