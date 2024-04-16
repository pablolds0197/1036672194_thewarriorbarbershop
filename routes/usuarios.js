const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");

const {
  usuariosGet,
  NombreUsuarioGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.get("/:Usuario", NombreUsuarioGet);

router.put(
  "/",
  [
    check("IdUsuario", "El id de usuario es obligatorio.").not().isEmpty(),
    check("IdRol", "El id de rol es obligatorio.").not().isEmpty(),
    check("Usuario", "El usuario es obligatorio.")
      .not()
      .isEmpty()
      .isLength({ min: 3, max: 20 })
      .withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres."),
    check("Estado", "El estado es obligatorio.").not().isEmpty(),
    check("Estado", "El estado debe ser un valor booleano.").isBoolean(),
    check("Nombre", "El nombre es obligatorio.")
      .not()
      .isEmpty()
      .isLength({ min: 3, max: 25 })
      .withMessage("El nombre debe tener entre 3 y 25 caracteres."),
    check("Apellidos", "El apellido es obligatorio.")
      .not()
      .isEmpty()
      .isLength({ min: 3, max: 25 })
      .withMessage("El apellido debe tener entre 3 y 30 caracteres."),
    check("Celular", "El celular es obligatorio.")
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage("El celular debe contener solo números.")
      .isLength({ min: 10, max: 10 })
      .withMessage("El celular debe ser de 10 dígitos."),
    check("Correo", "El correo es obligatorio.").not().isEmpty(),
    check("Correo", "El correo es inválido.").isEmail(),
    check("Pass", "La contraseña es obligatoria.")
      .not()
      .isEmpty()
      .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/)
      .withMessage(
        "La contraseña debe tener entre 8 y 20 caracteres, al menos un número y una letra mayúscula."
      ),
    validarCampos,
  ],
  usuariosPut
);

router.post(
  "/",
  [
    check("IdRol", "El id de rol es obligatorio.").not().isEmpty(),
    check("Usuario", "El usuario es obligatorio.")
      .not()
      .isEmpty()
      .isLength({ min: 3, max: 20 })
      .withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres."),
    check("Estado", "El estado es obligatorio.").not().isEmpty(),
    check("Estado", "El estado debe ser un valor booleano.").isBoolean(),
    check("Nombre", "El nombre es obligatorio.")
      .not()
      .isEmpty()
      .isLength({ min: 3, max: 25 })
      .withMessage("El nombre debe tener entre 3 y 25 caracteres."),
    check("Apellidos", "El apellido es obligatorio.")
      .not()
      .isEmpty()
      .isLength({ min: 3, max: 25 })
      .withMessage("El apellido debe tener entre 3 y 30 caracteres."),
    check("Celular", "El celular es obligatorio.")
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage("El celular debe contener solo números.")
      .isLength({ min: 10, max: 10 })
      .withMessage("El celular debe ser de 10 dígitos."),
    check("Correo", "El correo es obligatorio.").not().isEmpty(),
    check("Correo", "El correo es inválido.").isEmail(),
    check("Pass", "La contraseña es obligatoria.")
      .not()
      .isEmpty()
      .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/)
      .withMessage(
        "La contraseña debe tener entre 8 y 20 caracteres, al menos un número y una letra mayúscula."
      ),
    validarCampos,
  ],
  usuariosPost
);

router.delete("/", usuariosDelete);

module.exports = router;
