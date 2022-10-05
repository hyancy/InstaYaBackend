// Importar Express, Mongoose, dotenv y cors
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
// Ejecutamos la funcion express de express para iniciar la creación del servidor
const app = express();
// Establecer un puerto para correr nuestro servidor
// El modulo process con su metodo env(enviorenment) indican un puerto al desplegar la aplicacion o en su defecto un puerto asignado por nosotros
const PORT = process.env.PORT || 9000;
// Llamar las rutas para conectar servidos a la API
const userRoutes = require('./routes/users');
const servicRoutes = require('./routes/services');

//Crear las middlewares Functions para la conexión
app.use(express.json());
app.use(cors())
app.use('/api', userRoutes, servicRoutes);


// Iniciamos la conexion a la base de datos 
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connection established. Conected to MongoDB Atlas'))
    .catch(err => console.log('Error connecting to mongodb: ', err));

// Iniciar nuestro servidor y ponerlo en escucha
app.listen(PORT, () => console.log('CORS-enabled. Server listening in port ', PORT));