const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];

//Setup express
const express = require('express');
const app = express();

//Setup the view engine
const viewEngine = require('./config/viewEngineInit')
viewEngine(app);

//Setup the static files
app.use(express.static('static'));

//Setup the body parser
app.use(express.urlencoded({ extended: false }));

//Setup cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//Setup authentication middleware
const authMiddleware = require('./middlewares/authMiddleware');
app.use(authMiddleware.authentication);

//Setup routes
const routes = require('./config/routes')
routes(app);

//Setup the database
const database = require('./config/databaseInit')
database()
    .then(() => app.listen(config.port, console.log(`Database is up and server is listening on port ${config.port}...`)))
    .catch(err => console.error(err.message));