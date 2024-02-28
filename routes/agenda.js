const { Router} = require('express');

const { agendaGet,
        agendaPut,
        agendaPost,
        agendaDelete } = require('../controllers/agenda');

const router = Router();

router.get('/', agendaGet);

router.put('/', agendaPut);

router.post('/', agendaPost );

router.delete('/', agendaDelete);


module.exports = router;