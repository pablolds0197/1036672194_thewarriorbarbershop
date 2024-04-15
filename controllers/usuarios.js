const Usuarios = require("../models/usuarios");

const { response, request } = require("express");

const usuariosGet = async (req, res) => {
  try {
    const usuarios = await Usuarios.findAll(/*{ where: { Estado: true }}*/);
    res.json({ usuarios });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor..." });
  }
};

const NombreUsuarioGet = async (req, res) => {
  try {
    const { Usuario } = req.params;
    const usuario = await Usuarios.findOne({
      where: { Usuario: Usuario },
    });
    if (usuario) {
      res.json({ usuario });
    } else {
      res.status(404).json({ error: "Usuario no encontrado..." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor..." });
  }
};

const usuariosPost = async (req, res = response) => {
  let mensaje = "Usuario registrado extosamente...";
  const body = req.body;

  const existeUsuario = await Usuarios.findOne({
    where: { Usuario: body.Usuario },
  });
  const existeCorreo = await Usuarios.findOne({
    where: { Correo: body.Correo },
  });
  const existeCelular = await Usuarios.findOne({
    where: { Celular: body.Celular },
  });

  if (existeUsuario) {
    return res.status(400).json({
      mensaje: "Ese usuario ya existe!",
    });
  } else if (existeCelular) {
    return res.status(400).json({
      mensaje: "Ese número de celular ya está en uso!",
    });
  } else if (existeCorreo) {
    return res.status(400).json({
      mensaje: "Ese correo ya está en uso!",
    });
  } else {
    try {
      const usuarios = new Usuarios(body);
      usuarios.save();
    } catch (error) {
      mensaje = error;
      console.log(error);
    }
  }
  res.json({
    msg: mensaje,
  });
};

const usuariosPut = async (req, res = response) => {
  const {
    IdUsuario,
    Estado,
    IdRol,
    Usuario,
    Nombre,
    Apellidos,
    Correo,
    Celular,
    Pass,
  } = req.body;
  let mensaje = "Modificación exitosa";

  const existeUsuario = await Usuarios.findOne({
    where: { IdUsuario: IdUsuario },
  });

  try {
    if (Usuario !== existeUsuario.Usuario) {
      const otroUsuario = await Usuarios.findOne({
        where: { Usuario: Usuario },
      });
      if (otroUsuario) {
        return res.status(400).json({
          mensaje: "Ese usuario ya existe!",
        });
      } else {
        existeUsuario.Usuario = Usuario;
      }
    }
    if (Correo !== existeUsuario.Correo) {
      const otroUsuario = await Usuarios.findOne({
        where: { Correo: Correo },
      });
      if (otroUsuario) {
        return res.status(400).json({
          mensaje: "Ese correo ya está en uso!",
        });
      } else {
        existeUsuario.Correo = Correo;
      }
    }
    if (Celular !== existeUsuario.Celular) {
      const otroUsuario = await Usuarios.findOne({
        where: { Celular: Celular },
      });
      if (otroUsuario) {
        return res.status(400).json({
          mensaje: "Ese número de celular ya está en uso!",
        });
      } else {
        existeUsuario.Celular = Celular;
      }
    }
    //   existeUsuario.Usuario = Usuario !== undefined ? Usuario : existeUsuario.Usuario;
    const find = await Usuarios.findByPk(IdUsuario);
    find != null
      ? await Usuarios.update(
          {
            IdRol: IdRol,
            Estado: Estado,
            Usuario: Usuario,
            Nombre: Nombre,
            Apellidos: Apellidos,
            Correo: Correo,
            Celular: Celular,
            Pass: Pass,
          },
          {
            where: {
              IdUsuario: IdUsuario,
            },
          }
        )
      : (mensaje = "No existe el usuario para ser modificado...");
  } catch (error) {
    mensaje = "Se presentaron problemas al modificar el usuario...";
    console.log(error);
  }
  res.json({
    msg: mensaje,
  });
};

const usuariosDelete = async (req, res) => {
  const { IdUsuario } = req.body;
  let mensaje = "Usuarios eliminado exitosamente...";

  try {
    const usuario = await Usuarios.destroy({ where: { IdUsuario: IdUsuario } });
  } catch (error) {
    mensaje =
      "Se presentaron problemas al eliminar el usuario..." +
      req.params.IdUsuario;
  }

  res.json({
    msg: mensaje,
  });
};

module.exports = {
  usuariosGet,
  NombreUsuarioGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
};
