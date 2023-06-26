const mongoose = require('mongoose');
const config = require('./config');


//Setup the database
async function databaseInit() {
    await mongoose.connect(config.development.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log('Database is connected!');
}

module.exports = databaseInit;