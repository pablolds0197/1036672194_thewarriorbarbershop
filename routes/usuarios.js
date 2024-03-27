const { Router} = require('express');

const { usuariosGet,
        NombreusuarioGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.get('/:Usuario', NombreusuarioGet);

router.put('/', usuariosPut);

router.post('/', usuariosPost );

router.delete('/', usuariosDelete);


module.exports = router;