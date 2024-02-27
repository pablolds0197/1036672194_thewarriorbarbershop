const { Router} = require('express');

const { rolesGet,
        rolesPut,
        rolesPost,
        rolesDelete } = require('../controllers/rol');

const router = Router();

router.get('/', rolesGet);

router.put('/', rolesPut);

router.post('/', rolesPost );

router.delete('/', rolesDelete);


module.exports = router;