const{Schema, model, default: mongoose} = require('mongoose');

const LibroSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: false
    },
    cantidad: {
        type: Number,
        require: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', // Referencia al modelo de Usuarios
        required: true
    },
    sucursal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sucursal', // Referencia al modelo de Usuarios
        required: true
    },
});

LibroSchema.method('toJSON', function(){
    const { __v, _id, ...Object } = this.toObject();
    Object.lid = _id;
    return Object;
})

module.exports = model ('Libro',LibroSchema);