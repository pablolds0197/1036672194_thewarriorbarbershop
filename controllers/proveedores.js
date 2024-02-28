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

    const {IdProveedores, NombreProveedor, NombreContacto,  Telefono, Correo } = req.body
    let mensaje = 'Modificación exitosa'
    try{

        const find = await Proveedores.findByPk(IdProveedores);
        console.log(find);
        find != null ? 
        await proveedores.update(
            {
                NombreProveedor: NombreProveedor,
                NombreContacto: NombreContacto,
                Telefono: Telefono,
                Correo: Correo            
            },
            {
                where: {
                    IdProveedores: IdProveedores
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
    const {IdProveedores} = req.body
    let mensaje = 'proveedor eliminado exitosamente...'

    try{
        const proveedor = await Proveedores.destroy({ where: { IdProveedores: IdProveedores } });
    }
    catch(error){
        mensaje = 'Se presentaron problemas al eliminar el proveedor...'+ req.params.IdProveedores
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