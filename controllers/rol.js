
const Rol = require('../models/rol');


const { response , request} = require('express');

const rolesGet = async (req, res) => {
    try {
        const roles = await Rol.findAll();
        res.json({ roles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor...' });
    }
};

const rolesPost = async (req, res = response)=>{
    let mensaje = 'Rol registrado extosamente...'
    const body = req.body
    const existeRol = await Rol.findOne({NombreDelRol: body.NombreDelRol});
    if (existeRol) {
        mensaje = "Este nombre de rol ya existe...";
    } else {
        try {
            const roles = new Rol(body)
            roles.save()
        } catch (error) {
            mensaje = error
            console.log(error)
        }
    }
        res.json({
        msg: mensaje
    })
}

const rolesPut = async(req, res = response)=>{

    const {idRol, NombreDelRol,  Estado } = req.body
    let mensaje = 'Modificación exitosa'
    try{

        const find = await Rol.findByPk(idRol);
        console.log(find);
        find != null ? 
        await Rol.update(
            {
                NombreDelRol: NombreDelRol,
                Estado: Estado,
            },
            {
                where: {
                    idRol: idRol
                }
            }
        ) : mensaje = 'No existe el servicio para ser modificado...'
    }
    catch(error){
        mensaje = 'Se presentaron problemas al modificar el servicio...'
    }
    res.json({
        msg: mensaje
    })
}



const rolesDelete = async(req, res)=> {
    const {idRol} = req.body
    let mensaje = 'Rol eliminado exitosamente...'

    try{
        const servicio = await Rol.destroy({ where: { idRol: idRol } });
    }
    catch(error){
        mensaje = 'Se presentaron problemas al eliminar el serivicio...'+ req.params.idRol
    }

    res.json({
        msg: mensaje
    })
}

module.exports ={
    rolesGet,
    rolesPut,
    rolesPost,
    rolesDelete
}