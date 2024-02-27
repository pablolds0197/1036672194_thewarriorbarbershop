const { Router} = require('express');

const { gestionproductosGet,
        gestionproductosPut,
        gestionproductosPost,
        gestionproductosDelete } = require('../controllers/gestionproductos');

const router = Router();

router.get('/', gestionproductosGet);

router.put('/', gestionproductosPut);

router.post('/', gestionproductosPost );

router.delete('/', gestionproductosDelete);


module.exports = router;