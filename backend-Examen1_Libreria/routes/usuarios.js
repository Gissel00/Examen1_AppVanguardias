//Creacion de rutas
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar -campos');

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../Controllers/usuarios');

const router = Router();

//Ruta del get
router.get('/', getUsuarios);

//Ruta del post
router.post('/', [
            check('nombre', 'Este campo es obligatorio').not().isEmpty(),
            check('password', 'Este campo es obligatorio').not().isEmpty(),
            check('email', 'Este campo es obligatorio').isEmail(),
            validarCampos, 
        ],
        crearUsuario

);

//Ruta del put
router.put('/:id', [
    check('nombre', 'Este campo es obligatorio').not().isEmpty(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    check('email', 'Este campo es obligatori').isEmail(),
    validarCampos, 
],
actualizarUsuario
);

//Ruta del delete
router.delete('/:id',
borrarUsuario
);

module.exports = router;