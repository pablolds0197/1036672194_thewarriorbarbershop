const { Sequelize }= require('sequelize');

const db = new Sequelize({
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: 'admin',
    // password: 'admin', para el SENA
    database: 'twbs',
    logging: false,
    define: {
        timestamps: true
    },
    dialectOptions: {
        connectTimeout: 300000,
        idle: 10000,
        acquire: 30000,
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
});

// connectionString: process.env.DB_URL

module.exports = db;