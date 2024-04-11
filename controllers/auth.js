const Usuarios = require("../models/usuarios");

const { response } = require("express");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar_jwt");
const jwt = require("jsonwebtoken");

const login = async (req, res = response) => {
  const { correo, password } = req.body;
  try {
    const usuario = await Usuarios.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(400).json({
        msg: "Ese correo no está registrado...",
      });
    }
    // const valPass = bcryptjs.compareSync(password.trim(), usuario.Pass.trim());
    if (password !== usuario.Pass) {
      return res.status(400).json({
        msg: "Contraseña inválida...",
      });
    }

    const token = await generarJWT(usuario.Usuario)

    res.json({
      msg: "ok...",
      usuario,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error con el login...",
    });
  }
};

module.exports = {
  login,
};
