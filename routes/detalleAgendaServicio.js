const { Router} = require('express');

const { detalleAgendaServicioGet,
        detalleAgendaServicioPut,
        detalleAgendaServicioPost,
        detalleAgendaServicioDelete } = require('../controllers/detalleAgendaServicio');

const router = Router();

router.get('/', detalleAgendaServicioGet);

router.put('/', detalleAgendaServicioPut);

router.post('/', detalleAgendaServicioPost );

router.delete('/', detalleAgendaServicioDelete);


module.exports = router;