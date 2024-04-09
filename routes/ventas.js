const { Router} = require('express');

const { ventasGet,
        IdVentasGet,
        ventasPut,
        ventasPost,
        ventasDelete } = require('../controllers/ventas');

const router = Router();

router.get('/', ventasGet);

router.get('/:IdVenta', IdVentasGet);

router.put('/', ventasPut);

router.post('/', ventasPost );

router.delete('/', ventasDelete);


module.exports = router;