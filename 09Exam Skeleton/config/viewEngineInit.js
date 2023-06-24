const express = require('express');
const handlebars = require('express-handlebars');

module.exports = (app) => {

    //Setup the view engine
    app.set('view engine', 'hbs');
    app.engine('hbs', handlebars.engine({
        extname: 'hbs'
    }))

    //Setup the body parser
    app.use(express.urlencoded({extended: false}));

    //Setup the static files
    app.use(express.static('static'));
};