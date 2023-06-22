module.exports = {
    development: {
        port: process.env.PORT || 5000,
        DB_URI: 'mongodb://127.0.0.1:27017/cubicle',
        SECRET: 'qFIo@916j0M1'
    },
    production: {}
};