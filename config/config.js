const { Sequelize }= require('sequelize');

const db = new Sequelize({
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: '123456',
    database: 'twbs',
    logging: false,
    define: {
        timestamps: true
    }
});

module.exports = db;