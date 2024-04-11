const { Router} = require('express');

const { ventasGet,
        ventasPut,
        ventasPost,
        ventasDelete, 
        CodFacturaoGet} = require('../controllers/ventas');

const router = Router();

router.get('/', ventasGet);

router.get("/:CodFactura", CodFacturaoGet);

router.put('/', ventasPut);

router.post('/', ventasPost );

router.delete('/', ventasDelete);


module.exports = router;