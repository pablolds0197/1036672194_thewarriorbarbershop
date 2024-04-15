const Agenda = require("../models/agenda");

const { response, request } = require("express");

const agendaGet = async (req, res) => {
  try {
    const agenda = await Agenda.findAll();
    res.json({ agenda });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor..." });
  }
};

const agendaPost = async (req, res = response) => {
  let mensaje = "Agenda registrada extosamente...";
  const body = req.body;
  if (!body.IdEmpleado) {
    return res.status(400).json({
      mensaje: "Debe seleccionar un barbero!",
    });
  } else if (!body.IdServicio) {
    return res.status(400).json({
      mensaje: "El id de servicio no puede estar vacío",
    });
  } else if (!body.IdCliente) {
    return res.status(400).json({
      mensaje: "El id de cliente no puede estar vacío",
    });
  } else if (!body.FechaAgenda) {
    return res.status(400).json({
      mensaje: "Debe seleccionar una fecha!",
    });
  } else if (!body.HoraAgenda) {
    return res.status(400).json({
      mensaje: "Debe seleccionar una hora!",
    });
  } else if (!body.Valor) {
    return res.status(400).json({
      mensaje: "El valor no puede estar vacío!",
    });
  } else {
    try {
      const agenda = new Agenda(body);
      agenda.save();
    } catch (error) {
      mensaje = error;
      console.log(error);
    }
  }
  res.json({
    msg: mensaje,
  });
};

const agendaPut = async (req, res = response) => {
  const {
    IdAgenda,
    IdEmpleado,
    IdServicio,
    IdCliente,
    Estado,
    FechaAgenda,
    HoraAgenda,
    Valor,
  } = req.body;
  let mensaje = "Modificación exitosa";

  if (!IdEmpleado) {
    return res.status(400).json({
      mensaje: "Debe seleccionar un barbero!",
    });
  } else if (!IdServicio) {
    return res.status(400).json({
      mensaje: "Debe seleccionar un servicio!",
    });
  } else if (!IdCliente) {
    return res.status(400).json({
      mensaje: "Debe seleccionar un cliente!",
    });
  } else if (!FechaAgenda) {
    return res.status(400).json({
      mensaje: "Debe seleccionar una fecha!",
    });
  } else if (!HoraAgenda) {
    return res.status(400).json({
      mensaje: "Debe seleccionar una hora!",
    });
  } else if (!Valor) {
    return res.status(400).json({
      mensaje: "Debe seleccionar una hora!",
    });
  } else {
    try {
      const find = await Agenda.findByPk(IdAgenda);
      if (find != null) {
        // Actualizar la agenda
        await Agenda.update(
          {
            IdServicio: IdServicio,
            IdEmpleado: IdEmpleado,
            IdCliente: IdCliente,
            Estado: Estado,
            FechaAgenda: FechaAgenda,
            HoraAgenda: HoraAgenda,
            Valor: Valor,
          },
          {
            where: {
              IdAgenda: IdAgenda,
            },
          }
        );
        if (Estado) {
          setTimeout(() => {
            Agenda.update({ Estado: false }, { where: { IdAgenda: IdAgenda } });
            console.log("Estado cambiado a terminado...");
          }, 60000);
        }
      } else {
        mensaje = "No existe la agenda para ser modificada...";
      }
    } catch (error) {
      mensaje = "Se presentaron problemas al modificar la agenda...";
    }
  }
  res.json({
    msg: mensaje,
  });
};

const agendaDelete = async (req, res) => {
  const { IdAgenda } = req.body;
  let mensaje = "Agenda eliminada exitosamente...";

  try {
    const agenda = await Agenda.destroy({ where: { IdAgenda: IdAgenda } });
  } catch (error) {
    mensaje =
      "Se presentaron problemas al eliminar la agenda..." + req.params.IdAgenda;
  }

  res.json({
    msg: mensaje,
  });
};

module.exports = {
  agendaGet,
  agendaPut,
  agendaPost,
  agendaDelete,
};
