const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
const app = require('express')();

//Setup the view engine
require('./config/viewEngineInit')(app);

//Setup routes
require('./config/routes')(app);

require('./config/databaseInit')()
    .then(() => app.listen(config.port, console.log(`Database is up and server is listening on port ${config.port}...`)))
    .catch(err => console.error(err.message));


