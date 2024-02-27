const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.serviciosPath = '/api/servicios';
        this.rolesPath = '/api/roles';
        this.permisosPath = '/api/permisos';
        this.rolesxpermisosPath = '/api/rolesxpermisos';
        //Midelewars
        this.middlewares();
        //Ruras aplicacion
        this.routes();
    }
    middlewares(){
        //cors
        this.app.use( cors());
        //parseo lectura body
        this.app.use( express.json() );
        //directorio publico por defecto
        this.app.use( express.static('public'));
        this.app.use(logger('dev'));
        this.app.use(bodyParser.urlencoded({ extended: false}));
    }
    routes(){
        this.app.use(this.serviciosPath, require('../routes/servicios'));
        this.app.use(this.rolesPath, require('../routes/roles'));
        this.app.use(this.rolesxpermisosPath, require('../routes/rolesxpermisos'));
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto '+ this.port); 
        });   
    }
}
module.exports = Server