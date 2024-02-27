const { Router} = require('express');

const { empleadosGet,
        empleadosPut,
        empleadosPost,
        empleadosDelete } = require('../controllers/empleados');

const router = Router();

router.get('/', empleadosGet);

router.put('/', empleadosPut);

router.post('/', empleadosPost );

router.delete('/', empleadosDelete);


module.exports = router;