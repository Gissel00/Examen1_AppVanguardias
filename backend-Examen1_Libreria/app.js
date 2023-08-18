// Importar la libreria del express
var express = require ('express');

require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Inicializacion de variables
var app = express();

//Configuracion del CORS
app.use(cors());

//Lectura del body
app.use(express.json());

//Base de datos
dbConnection();

//Creacion de Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/sucursales', require('./routes/sucursales'));
app.use('/api/libros', require('./routes/libros'));


//Peticiones
app.listen(process.env.PORT, () =>{
    console.log('Express Server Puerto 3000:\x1b[32m%s\x1b[0m', 'online')
});