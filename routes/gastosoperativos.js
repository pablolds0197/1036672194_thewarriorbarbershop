const { Router} = require('express');

const { gastosoperativosGet,
        gastosoperativosPut,
        gastosoperativosPost,
        gastosoperativosDelete } = require('../controllers/gastosoperativos');

const router = Router();

router.get('/', gastosoperativosGet);

router.put('/', gastosoperativosPut);

router.post('/', gastosoperativosPost );

router.delete('/', gastosoperativosDelete);


module.exports = router;