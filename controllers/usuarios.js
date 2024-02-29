
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

const usuariosPost = async (req, res = response)=>{
    let mensaje = 'Usuarios registrado extosamente...'
    const body = req.body

    const valEm = /^[a-zA-Z0-9]+@[a-zA-Z]{4,8}\.[a-zA-Z]{2,4}$/;
    const valPa = /^[a-zA-Z0-9]{8,15}$/;
    const existeUsuario = await Usuarios.findOne( {where: { Usuario: body.Usuario} });
    const existeCorreo = await Usuarios.findOne( {where: { Correo: body.Correo} });
    const existeCelular = await Usuarios.findOne( {where: { Celular: body.Celular} });
    
    if (!body.IdRol && !body.Usuario && !body.Nombre && !body.Apellidos && !body.Correo && !body.Celular && !body.Pass) {
        return res.status(400).json({
            mensaje: "Debe llenar todos los campos!",
        });
    } else if (!body.IdRol) {
        return res.status(400).json({
            mensaje: "Debe seleccionar un rol!",
        });
    } else if (!body.Usuario) {
        return res.status(400).json({
            mensaje: "El usuario no puede estar vacío!",
        });
    } else if (existeUsuario) {
        return res.status(400).json({
            mensaje: "Ese usuario ya existe!",
        });
    } else if (!body.Nombre) {
        return res.status(400).json({
            mensaje: "El nombre no puede estar vacío!",
        });
    } else if (!body.Apellidos) {
        return res.status(400).json({
            mensaje: "El apellido no puede estar vacío!",
        });
    } else if (!body.Correo) {
        return res.status(400).json({
            mensaje: "El correo no puede estar vacío!",
        });
    } else if (body.Correo != body.Correo.match(valEm) && body.Pass != body.Pass.match(valPa)) {
        return res.status(400).json({
            mensaje: "El correo y la contraseña son inválidos!",
        });
    } else if (body.Correo != body.Correo.match(valEm)) {
        return res.status(400).json({
            mensaje: "El correo es inválido!",
        });
    } else if (body.Pass != body.Pass.match(valPa)) {
        return res.status(400).json({
            mensaje: "La contraseña es inválida!",
        });
    }  else if (!body.Celular) {
        return res.status(400).json({
          mensaje: "El número de celular no puede estar vacío!",
        });
    } else if (!body.Pass) {
        return res.status(400).json({
            mensaje: "La contraseña no puede estar vacía!",
        });
    } else {
        try {
            const usuarios = new Usuarios(body) 
            usuarios.save()
        } catch (error) {
            mensaje = error
            console.log(error)
        }
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