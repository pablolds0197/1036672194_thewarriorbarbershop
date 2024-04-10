const { Router} = require('express');

const { rolesGet,
        rolesGetById,
        rolesPut,
        rolesPost,
        rolesDelete } = require('../controllers/rol');

const router = Router();

router.get('/', rolesGet);

router.get('/:IdRol', rolesGetById);

router.put('/', rolesPut);

router.post('/', rolesPost );

router.delete('/', rolesDelete);


module.exports = router;