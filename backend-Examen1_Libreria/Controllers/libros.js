const { response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Libro = require('../models/libro');


//GET - MOSTRAR
const getLibro = async(req, res) =>{

    const libros = await Libro.find({}, 'nombre img usuario cantidad sucursal');

    res.status(200).json({
        ok:true,
        libros
    })
}

//POST - CREATE
const crearLibro = async(req, res = response) =>{

    const {nombre,img,usuario,cantidad,sucursal} = req.body

    try {

        // const existeUsuario = await Sucursal.findById({usuario});

        // if(!existeUsuario){
        //     return res.status(400).json({
        //         ok: false,
        //         msg: 'No existe el Usuario!!!'
        //     });
        // }


     const libro = new Libro( req.body );

     await libro.save();
     res.status(200).json({
         ok:true,
         libro
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
const actualizarLibro = async (req, res = response) =>{
    
    const lid = req.params.id;

    try {

        const libroDB = await Libro.findById( lid );

        if(!libroDB){
            return res.status(404).json({
                ok: false,
                msg: 'El id de de Libro No EXISTE!!!!!'
            });
        }

        //Actualizar
        const { nombre, img, cantidad,usuario,...campos} = req.body;
    
        campos.nombre = nombre;
        campos.img = img;
        campos.cantidad = cantidad;
        campos.usuario = usuario

        const actualizarLibro = await Libro.findByIdAndUpdate( lid, campos, { new: true });

        res.json({
            ok: true,
            libro: actualizarLibro
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
const borrarLibro = async(req, res = response) =>{
    const lid = req.params.id
    
    try {

        const libroDB = await Libro.findById(lid);

        if(!libroDB){
            return res.status(404).json({
                ok: false,
                msg: 'El id de el libro No EXISTE!!!!!'
            });
        }

        await Libro.findByIdAndDelete(lid);

        res.json({
            ok: true,
            msg: 'Libro Eliminado correctamente!!!'
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
    getLibro,
    crearLibro,
    actualizarLibro,
    borrarLibro
}