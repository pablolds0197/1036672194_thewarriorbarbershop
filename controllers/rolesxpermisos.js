
const Rolesxpermiso = require('../models/rolesxpermisos');


const { response , request} = require('express');

const rolesxpermisosGet = async (req, res) => {
    try {
        const rolesxpermisos = await Rolesxpermiso.findAll();
        res.json({ rolesxpermisos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor...' });
    }
};

const rolesxpermisosPost = async (req, res = response)=>{
    let mensaje = 'Rolesxpermiso registrado extosamente...'
    const body = req.body
        try {
            const rolesxpermisos = new Rolesxpermiso(body)
            rolesxpermisos.save()
        } catch (error) {
            mensaje = error
            console.log(error)
        }
        res.json({
        msg: mensaje
    })
}

const rolesxpermisosPut = async(req, res = response)=>{

    const {IdRolesxpermiso, IdRol,  IdPermiso } = req.body
    let mensaje = 'Modificación exitosa...'
    try{

        const find = await Rolesxpermiso.findByPk(IdRolesxpermiso);
        console.log(find);
        find != null ? 
        await Rolesxpermiso.update(
            {
                IdRol: IdRol,
                IdPermiso: IdPermiso,
            },
            {
                where: {
                    IdRolesxpermiso: IdRolesxpermiso
                }
            }
        ) : mensaje = 'No existe el rolesxpermiso para ser modificado...'
    }
    catch(error){
        mensaje = 'Se presentaron problemas al modificar el rolesxpermiso...'
    }
    res.json({
        msg: mensaje
    })
}



const rolesxpermisosDelete = async(req, res)=> {
    const {IdRolesxpermiso} = req.body
    let mensaje = 'Rolesxpermiso eliminado exitosamente...'

    try{
        const rolesxpermisos = await Rolesxpermiso.destroy({ where: { IdRolesxpermiso: IdRolesxpermiso } });
    }
    catch(error){
        mensaje = 'Se presentaron problemas al eliminar el rolesxpermiso...'+ req.params.IdRolesxpermiso
    }

    res.json({
        msg: mensaje
    })
}

module.exports ={
    rolesxpermisosGet,
    rolesxpermisosPut,
    rolesxpermisosPost,
    rolesxpermisosDelete
}