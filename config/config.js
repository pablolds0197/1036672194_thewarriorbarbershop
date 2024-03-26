const { Sequelize }= require('sequelize');
const db = new Sequelize({
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: '',
    // password: 'admin', para el SENA
    database: 'twbs',
    logging: false,
    define: {
        timestamps: true
    },
    dialectOptions: {
        connectTimeout: 300000,
    },
});

module.exports = db;