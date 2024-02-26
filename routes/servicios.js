const { Router} = require('express');

const { serviciosGet,
        serviciosPut,
        serviciosPost,
        serviciosDelete } = require('../controllers/servicios');

const router = Router();

router.get('/', serviciosGet);

router.put('/', serviciosPut);

router.post('/', serviciosPost );

router.delete('/', serviciosDelete);


module.exports = router;