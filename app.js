
require('dotenv').config();



const Server = require('./models/server');

const server = new Server();

const db = require('./config/config');

db.authenticate().then(()=>{
    console.log('Conexion a la base de datos establecida correctamente');
}).catch((error) =>{
    console.log('Error al conectar la base de datos: ', error)
});

server.listen();

