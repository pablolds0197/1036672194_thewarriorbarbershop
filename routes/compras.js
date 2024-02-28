const { Router} = require('express');

const { comprasGet,
        comprasPut,
        comprasPost,
        comprasDelete } = require('../controllers/compras');

const router = Router();

router.get('/', comprasGet);

router.put('/', comprasPut);

router.post('/', comprasPost );

router.delete('/', comprasDelete);


module.exports = router;