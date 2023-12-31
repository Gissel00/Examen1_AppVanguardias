const{Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        require: true,
        default: 'user',
        enum: ['admin', 'user'] // Lista de roles permitidos
    },
    google: {
        type: Boolean,
        default: false,
    },
});

UsuarioSchema.method('toJSON', function(){
    const { __v, _id, ...Object } = this.toObject();
    Object.uid = _id;
    return Object;
})


module.exports = model ('Usuario',UsuarioSchema);