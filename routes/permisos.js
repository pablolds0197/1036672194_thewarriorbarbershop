const { Router} = require('express');

const { permisosGet,
        permisosPut,
        permisosPost,
        permisosDelete } = require('../controllers/permisos');

const router = Router();

router.get('/', permisosGet);

router.put('/', permisosPut);

router.post('/', permisosPost );

router.delete('/', permisosDelete);


module.exports = router;