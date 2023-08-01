const handlebars = require('express-handlebars');

module.exports = (app) => {

    //Setup the view engine
    app.set('view engine', 'hbs');
    app.engine('hbs', handlebars.engine({
        extname: 'hbs'
    }))

};