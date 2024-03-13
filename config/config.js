const { Sequelize }= require('sequelize');

const db = new Sequelize({
    dialect: 'postgres',
    host:  'dpg-cnog9fn79t8c73blvm00-a.oregon-postgres.render.com',
    // host: '127.0.0.1', local
    port: process.env.PORT,
    username: 'admins',
    // username: 'root', local
    password: 'TjejpbUhWurnxbPMPjZhQxAdtAtolIrM',
    // password: 'admin', para SENA
    database: 'twbs_j2ba',
    // database: 'twbs', local
    logging: console.log,
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