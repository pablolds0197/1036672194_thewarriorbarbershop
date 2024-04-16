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
  try {
    const agenda = new Agenda(body);
    await agenda.save();
    if (body.Estado && body.IdAgenda) {
      setTimeout(async () => {
        await Agenda.update(
          { Estado: false },
          { where: { IdAgenda: body.IdAgenda } }
        );
        console.log("Estado cambiado a terminado...");
      }, 10000);
    }
  } catch (error) {
    mensaje = error;
    console.log(error);
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
  try {
    const find = await Agenda.findByPk(IdAgenda);
    if (find != null) {
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
        }, 10000);
      }
    } else {
      mensaje = "No existe la agenda para ser modificada...";
    }
  } catch (error) {
    mensaje = "Se presentaron problemas al modificar la agenda...";
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
