const { Router} = require('express');

const { detalleProductosComprasGet,
        detalleProductosComprasPut,
        detalleProductosComprasPost,
        detalleProductosComprasDelete } = require('../controllers/detalleProductosCompras');

const router = Router();

router.get('/', detalleProductosComprasGet);

router.put('/', detalleProductosComprasPut);

router.post('/', detalleProductosComprasPost );

router.delete('/', detalleProductosComprasDelete);


module.exports = router;