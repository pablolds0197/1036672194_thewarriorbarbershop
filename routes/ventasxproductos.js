const { Router} = require('express');

const { ventasxproductosGet,
        ventasxproductosPut,
        ventasxproductosPost,
        ventasxproductosDelete } = require('../controllers/ventasxproductos');

const router = Router();

router.get('/', ventasxproductosGet);

router.put('/', ventasxproductosPut);

router.post('/', ventasxproductosPost );

router.delete('/', ventasxproductosDelete);


module.exports = router;