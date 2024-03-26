const Proveedores = require('../models/proveedores');


const { response , request} = require('express');

const proveedoresGet = async (req, res) => {
    try {
        const proveedores = await Proveedores.findAll();
        res.json({ proveedores });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor...' });
    }
};

const proveedoresPost = (req, res = response)=>{
    let mensaje = 'proveedor registrado extosamente...'
    const body = req.body
    try {
        const proveedores = new Proveedores(body) 
        proveedores.save()
    } catch (error) {
        mensaje = error
        console.log(error)
    }
        res.json({
        msg: mensaje
    })
}

const proveedoresPut = async(req, res = response)=>{

    const {IdProveedor, NombreProveedor, NombreContacto,  Telefono, Correo } = req.body
    let mensaje = 'Modificación exitosa'
    try{

        const find = await Proveedores.findByPk(IdProveedor);
        console.log(find);
        find != null ? 
        await Proveedores.update(
            {
                NombreProveedor: NombreProveedor,
                NombreContacto: NombreContacto,
                Telefono: Telefono,
                Correo: Correo            
            },
            {
                where: {
                    IdProveedor: IdProveedor
                }
            }
        ) : mensaje = 'No existe el proveedores para ser modificado...'
    }
    catch(error){
        mensaje = 'Se presentaron problemas al modificar el proveedor...'
    }
    res.json({
        msg: mensaje
    })
}

const proveedoresDelete = async(req, res)=> {
    const {IdProveedor} = req.body
    let mensaje = 'proveedor eliminado exitosamente...'

    try{
        const proveedor = await Proveedores.destroy({ where: { IdProveedor: IdProveedor } });
    }
    catch(error){
        mensaje = 'Se presentaron problemas al eliminar el proveedor...'+ req.params.IdProveedor
    }

    res.json({
        msg: mensaje
    })
}

module.exports ={
    proveedoresGet,
    proveedoresPut,
    proveedoresPost,
    proveedoresDelete
}