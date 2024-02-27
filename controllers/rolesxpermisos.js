
const Rolesxpermisos = require('../models/rolesxpermisos');


const { response , request} = require('express');

const rolesxpermisosGet = async (req, res) => {
    try {
        const rolesxpermisos = await Rolesxpermisos.findAll();
        res.json({ rolesxpermisos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor...' });
    }
};

const rolesxpermisosPost = async (req, res = response)=>{
    let mensaje = 'roles por permisos registrados extosamente...'
    const body = req.body
        try {
            const rolesxpermisos = new Rolesxpermisos(body)
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

    const {IdRolesxpermisos, IdRol,  IdPermiso } = req.body
    let mensaje = 'Modificación exitosa...'
    try{

        const find = await Rolesxpermisos.findByPk(IdRolesxpermisos);
        console.log(find);
        find != null ? 
        await Rolesxpermisos.update(
            {
                IdRol: IdRol,
                IdPermiso: IdPermiso,
            },
            {
                where: {
                    IdRolesxpermisos: IdRolesxpermisos
                }
            }
        ) : mensaje = 'No existen los roles por permisos para ser modificados...'
    }
    catch(error){
        mensaje = 'Se presentaron problemas al modificar los roles por permisos...'
    }
    res.json({
        msg: mensaje
    })
}



const rolesxpermisosDelete = async(req, res)=> {
    const {IdRolesxpermisos} = req.body
    let mensaje = 'roles por permisos eliminados exitosamente...'

    try{
        const rolesxpermisos = await Rolesxpermisos.destroy({ where: { IdRolesxpermisos: IdRolesxpermisos } });
    }
    catch(error){
        mensaje = 'Se presentaron problemas al eliminar los roles por permisos...'+ req.params.IdRolesxpermisos
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