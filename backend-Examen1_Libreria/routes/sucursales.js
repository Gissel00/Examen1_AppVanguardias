//Creacion de rutas
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar -campos');

const {  getSucursales, crearSucursal, actualizarSucursal, borrarSucursal } = require('../Controllers/sucursales');

const router = Router();

//Ruta del get
router.get('/', getSucursales);

//Ruta del post
router.post('/', [
            check('nombre', 'Este campo es obligatorio').not().isEmpty(),
            check('usuario', 'Este campo es obligatorio').not().isEmpty(),
            validarCampos, 
        ],
        crearSucursal

);

//Ruta del put
router.put('/:id', [
    check('nombre', 'Este campo es obligatorio').not().isEmpty(),
    check('usuario', 'Este campo es obligatorio').not().isEmpty(),
    validarCampos, 
],
actualizarSucursal
);

//Ruta del delete
router.delete('/:id',
borrarSucursal
);

module.exports = router;