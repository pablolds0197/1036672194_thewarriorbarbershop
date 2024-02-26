const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.comprasPath = '/api/servicios';
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
       this.app.use(this.comprasPath, require('../routes/servicios'));
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto '+ this.port); 
        });   
    }
}

module.exports = Server