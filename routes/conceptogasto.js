const { Router} = require('express');

const { conceptogastoGet,
        conceptogastoPut,
        conceptogastoPost,
        conceptogastoDelete } = require('../controllers/conceptogasto');

const router = Router();

router.get('/', conceptogastoGet);

router.put('/', conceptogastoPut);

router.post('/', conceptogastoPost );

router.delete('/', conceptogastoDelete);


module.exports = router;