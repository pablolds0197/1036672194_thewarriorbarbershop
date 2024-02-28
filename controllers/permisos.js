
const Permiso = require('../models/permisos');


const { response , request} = require('express');

const permisosGet = async (req, res) => {
    try {
        const permisos = await Permiso.findAll();
        res.json({ permisos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor...' });
    }
};

const permisosPost = async (req, res = response)=>{
    let mensaje = 'Permiso registrado extosamente...'
    const body = req.body
        try {
            const permisos = new Permiso(body)
            permisos.save()
        } catch (error) {
            mensaje = error
            console.log(error)
        }
        res.json({
        msg: mensaje
    })
}

const permisosPut = async(req, res = response)=>{

    const {IdPermiso, NombreDelPermiso,  Descripcion } = req.body
    let mensaje = 'Modificación exitosa'
    try{

        const find = await Permiso.findByPk(IdPermiso);
        console.log(find);
        find != null ? 
        await Permiso.update(
            {
                NombreDelPermiso: NombreDelPermiso,
                Descripcion: Descripcion,
            },
            {
                where: {
                    IdPermiso: IdPermiso
                }
            }
        ) : mensaje = 'No existe el permiso para ser modificado...'
    }
    catch(error){
        mensaje = 'Se presentaron problemas al modificar el permiso...'
    }
    res.json({
        msg: mensaje
    })
}



const permisosDelete = async(req, res)=> {
    const {IdPermiso} = req.body
    let mensaje = 'Permiso eliminado exitosamente...'

    try{
        const permisos = await Permiso.destroy({ where: { IdPermiso: IdPermiso } });
    }
    catch(error){
        mensaje = 'Se presentaron problemas al eliminar el permiso...'+ req.params.IdPermiso
    }

    res.json({
        msg: mensaje
    })
}

module.exports ={
    permisosGet,
    permisosPut,
    permisosPost,
    permisosDelete
}