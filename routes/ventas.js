const { Router} = require('express');

const { ventasGet,
        ventasPut,
        ventasPost,
        ventasDelete } = require('../controllers/ventas');

const router = Router();

router.get('/', ventasGet);

router.put('/', ventasPut);

router.post('/', ventasPost );

router.delete('/', ventasDelete);


module.exports = router;