//Creacion de rutas
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar -campos');

const {    getLibro,crearLibro,actualizarLibro, borrarLibro } = require('../Controllers/libros');

const router = Router();

//Ruta del get
router.get('/', getLibro);

//Ruta del post
router.post('/', [
            check('nombre', 'Este campo es obligatorio').not().isEmpty(),
            check('usuario', 'Este campo es obligatorio').not().isEmpty(),
            check('sucursal', 'Este campo es obligatorio').not().isEmpty(),
            validarCampos, 
        ],
        crearLibro

);

//Ruta del put
router.put('/:id', [
    check('nombre', 'Este campo es obligatorio').not().isEmpty(),
    check('usuario', 'Este campo es obligatorio').not().isEmpty(),
    check('sucursal', 'Este campo es obligatorio').not().isEmpty(),
    validarCampos, 
],
actualizarLibro
);

//Ruta del delete
router.delete('/:id',
borrarLibro
);

module.exports = router;