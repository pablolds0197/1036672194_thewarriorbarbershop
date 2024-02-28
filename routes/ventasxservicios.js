const { Router} = require('express');

const { ventasxserviciosGet,
        ventasxserviciosPut,
        ventasxserviciosPost,
        ventasxserviciosDelete } = require('../controllers/ventasxservicios');

const router = Router();

router.get('/', ventasxserviciosGet);

router.put('/', ventasxserviciosPut);

router.post('/', ventasxserviciosPost );

router.delete('/', ventasxserviciosDelete);


module.exports = router;