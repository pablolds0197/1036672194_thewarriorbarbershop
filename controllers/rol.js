
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
        try {
            const roles = new Rol(body)
            roles.save()
        } catch (error) {
            mensaje = error
            console.log(error)
        }
        res.json({
        msg: mensaje
    })
}

const rolesPut = async(req, res = response)=>{

    const {IdRol, NombreDelRol,  Estado } = req.body
    let mensaje = 'Modificación exitosa'
    try{

        const find = await Rol.findByPk(IdRol);
        console.log(find);
        find != null ? 
        await Rol.update(
            {
                NombreDelRol: NombreDelRol,
                Estado: Estado,
            },
            {
                where: {
                    IdRol: IdRol
                }
            }
        ) : mensaje = 'No existe el rol para ser modificado...'
    }
    catch(error){
        mensaje = 'Se presentaron problemas al modificar el rol...'
    }
    res.json({
        msg: mensaje
    })
}



const rolesDelete = async(req, res)=> {
    const {IdRol} = req.body
    let mensaje = 'Rol eliminado exitosamente...'

    try{
        const rol = await Rol.destroy({ where: { IdRol: IdRol } });
    }
    catch(error){
        mensaje = 'Se presentaron problemas al eliminar el rol...'+ req.params.IdRol
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