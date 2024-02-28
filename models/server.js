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
        this.usuariosPath = '/api/usuarios';
        this.gestionproductosPath = '/api/gestionproductos';
        this.conceptogastoPath = '/api/conceptogasto';
        this.empleadosPath = '/api/empleados';
        this.gastosoperativosPath = '/api/gastosoperativos';
        this.clientesPath = '/api/clientes';
        this.ventasPath = '/api/ventas';
        this.ventasxserviciosPath = '/api/ventasxservicios';
        this.ventasxproductosPath = '/api/ventasxproductos';


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
        this.app.use(this.permisosPath, require('../routes/permisos'));
        this.app.use(this.rolesxpermisosPath, require('../routes/rolesxpermisos'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
        this.app.use(this.gestionproductosPath, require('../routes/gestionproductos'));
        this.app.use(this.conceptogastoPath, require('../routes/conceptogasto'));
        this.app.use(this.empleadosPath, require('../routes/empleados'));
        this.app.use(this.gastosoperativosPath, require('../routes/gastosoperativos'));
        this.app.use(this.clientesPath, require('../routes/clientes'));
        this.app.use(this.ventasPath, require('../routes/ventas'));
        this.app.use(this.ventasxserviciosPath, require('../routes/ventasxservicios'));
        this.app.use(this.ventasxproductosPath, require('../routes/ventasxproductos'));

    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto '+ this.port); 
        });   
    }
}
module.exports = Server