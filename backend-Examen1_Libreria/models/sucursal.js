const{Schema, model, default: mongoose} = require('mongoose');

const SucursalSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: false
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', // Referencia al modelo de Usuarios
        required: true
    },
});

SucursalSchema.method('toJSON', function(){
    const { __v, _id, ...Object } = this.toObject();
    Object.sid = _id;
    return Object;
})


module.exports = model ('Sucursal',SucursalSchema);