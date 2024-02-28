const { Router} = require('express');

const { clientesGet,
        clientesPut,
        clientesPost,
        clientesDelete } = require('../controllers/clientes');

const router = Router();

router.get('/', clientesGet);

router.put('/', clientesPut);

router.post('/', clientesPost );

router.delete('/', clientesDelete);


module.exports = router;