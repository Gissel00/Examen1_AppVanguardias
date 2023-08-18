const { response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Sucursal = require('../models/sucursal');


//GET - MOSTRAR
const getSucursales = async(req, res) =>{

    const sucursales = await Sucursal.find({}, 'nombre img usuario');

    res.status(200).json({
        ok:true,
        sucursales
    })
}

//POST - CREATE
const crearSucursal = async(req, res = response) =>{

    const {nombre,img,usuario} = req.body

    try {

        // const existeUsuario = await Sucursal.findById({usuario});

        // if(!existeUsuario){
        //     return res.status(400).json({
        //         ok: false,
        //         msg: 'No existe el Usuario!!!'
        //     });
        // }


     const sucursal = new Sucursal( req.body );

     await sucursal.save();
     res.status(200).json({
         ok:true,
         sucursal
      });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al insertar datos!!!'
        })
    }
}

//PUT - ACTUALIZAR
const actualizarSucursal = async (req, res = response) =>{
    
    const sid = req.params.id;

    try {

        const sucursalDB = await Sucursal.findById( sid );

        if(!sucursalDB){
            return res.status(404).json({
                ok: false,
                msg: 'El id de la sucursal No EXISTE!!!!!'
            });
        }

        //Actualizar
        const { nombre, img, usuario,...campos} = req.body;
    
        campos.nombre = nombre;
        campos.img = img;
        campos.usuario = usuario;

        const sucursalActualizada = await Sucursal.findByIdAndUpdate( sid, campos, { new: true });

        res.json({
            ok: true,
            sucursal: sucursalActualizada
        });


    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado!!!'
        })
    }
}

//DELETE - Borrar
const borrarSucursal = async(req, res = response) =>{
    const sid = req.params.id
    
    try {

        const sucursalDB = await Sucursal.findById(sid);

        if(!sucursalDB){
            return res.status(404).json({
                ok: false,
                msg: 'El id de la sucursal No EXISTE!!!!!'
            });
        }

        await Sucursal.findByIdAndDelete(sid);

        res.json({
            ok: true,
            msg: 'Sucursal Eliminado correctamente!!!'
        });
}catch(error){

    console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al borrar registro!!!'
        })
    }
}

module.exports = {
    getSucursales,
    crearSucursal,
    actualizarSucursal,
    borrarSucursal
}