const { Router} = require('express');

const { rolesxpermisosGet,
        rolesxpermisosPut,
        rolesxpermisosPost,
        rolesxpermisosDelete } = require('../controllers/rolesxpermisos');

const router = Router();

router.get('/', rolesxpermisosGet);

router.put('/', rolesxpermisosPut);

router.post('/', rolesxpermisosPost );

router.delete('/', rolesxpermisosDelete);


module.exports = router;