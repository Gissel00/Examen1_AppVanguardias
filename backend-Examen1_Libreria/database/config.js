//Importacion
const mongoose = require('mongoose');

//Crear funcion para conexion BDD
const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true
        });
        console.log('Base de datos Online')

    }catch (error){
        console.log(error);
        throw new error('Error al iniciar base de datos!!!!')
    }
}

module.exports = {
    dbConnection
}
