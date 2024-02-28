const { Router} = require('express');

const { proveedoresGet,
        proveedoresPut,
        proveedoresPost,
        proveedoresDelete } = require('../controllers/proveedores');

const router = Router();

router.get('/', proveedoresGet);

router.put('/', proveedoresPut);

router.post('/', proveedoresPost );

router.delete('/', proveedoresDelete);


module.exports = router;