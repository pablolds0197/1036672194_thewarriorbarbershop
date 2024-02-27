
const Usuarios = require('../models/usuarios');


const { response , request} = require('express');

const usuariosGet = async (req, res) => {
    try {
        const usuarios = await Usuarios.findAll();
        res.json({ usuarios });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor...' });
    }
};

const usuariosPost = (req, res = response)=>{
    let mensaje = 'Usuarios registrado extosamente...'
    const body = req.body
    try {
        const usuarios = new Usuarios(body) 
        usuarios.save()
    } catch (error) {
        mensaje = error
        console.log(error)
    }
        res.json({
        msg: mensaje
    })
}

const usuariosPut = async(req, res = response)=>{

    const {IdUsuario, IdRol, Usuario,  Nombre, Apellidos, Correo, Celular, Pass } = req.body
    let mensaje = 'Modificación exitosa'
    try{

        const find = await Usuarios.findByPk(IdUsuario);
        console.log(find);
        find != null ? 
        await Usuarios.update(
            {
                IdRol: IdRol,
                Usuario: Usuario,
                Nombre: Nombre,
                Apellidos: Apellidos,
                Correo: Correo,
                Celular: Celular,
                Pass: Pass
            },
            {
                where: {
                    IdUsuario: IdUsuario
                }
            }
        ) : mensaje = 'No existe el usuario para ser modificado...'
    }
    catch(error){
        mensaje = 'Se presentaron problemas al modificar el usuario...'
    }
    res.json({
        msg: mensaje
    })
}



const usuariosDelete = async(req, res)=> {
    const {IdUsuario} = req.body
    let mensaje = 'Usuarios eliminado exitosamente...'

    try{
        const usuario = await Usuarios.destroy({ where: { IdUsuario: IdUsuario } });
    }
    catch(error){
        mensaje = 'Se presentaron problemas al eliminar el usuario...'+ req.params.IdUsuario
    }

    res.json({
        msg: mensaje
    })
}

module.exports ={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}