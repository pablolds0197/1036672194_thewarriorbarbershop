const { Sequelize }= require('sequelize');
const db = new Sequelize({
    dialect: 'mysql',
    host: '127.0.0.1',
    // host: '34.134.5.40',
    username: 'root',
    // username: 'lizcano',
    password: '',
    // password: 'lizcano123',
    // password: 'admin', para el SENA
    database: 'twbs',
    // database: 'TWBS',
    logging: false,
    define: {
        timestamps: true
    },
    dialectOptions: {
        connectTimeout: 300000,
    },
});
module.exports = db;