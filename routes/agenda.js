const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");

const {
  agendaGet,
  agendaPut,
  agendaPost,
  agendaDelete,
} = require("../controllers/agenda");

const router = Router();

router.get("/", agendaGet);

router.put(
  "/",
  [
    check("IdAgenda", "El id de la agenda es obligatorio.").not().isEmpty(),
    check("IdEmpleado", "El id del empleado es obligatorio.").not().isEmpty(),
    check("IdCliente", "El id del cliente es obligatorio.").not().isEmpty(),
    check("IdServicio", "El id del servicio es obligatorio.").not().isEmpty(),
    check("Estado", "El estado es obligatorio.").not().isEmpty(),
    check("FechaAgenda", "La fecha es obligatoria.").not().isEmpty(),
    check("HoraAgenda", "La hora es obligatoria.").not().isEmpty(),
    check("Valor", "El valor es obligatorio.").not().isEmpty(),
    validarCampos,
  ],
  agendaPut
);

router.post(
  "/",
  [
    check("IdEmpleado", "El id del empleado es obligatorio.").not().isEmpty(),
    check("IdCliente", "El id del cliente es obligatorio.").not().isEmpty(),
    check("IdServicio", "El id del servicio es obligatorio.").not().isEmpty(),
    check("Estado", "El estado es obligatorio.").not().isEmpty(),
    check("FechaAgenda", "La fecha es obligatoria.").not().isEmpty(),
    check("HoraAgenda", "La hora es obligatoria.").not().isEmpty(),
    check("Valor", "El valor es obligatorio.").not().isEmpty(),
    validarCampos,
  ],
  agendaPost
);

router.delete("/", agendaDelete);

module.exports = router;
