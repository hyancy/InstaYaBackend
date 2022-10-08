const mongoose = require('mongoose');
// Iniciamos la conexion a la base de datos 
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connection established. Conected to MongoDB Atlas'))
    .catch(err => console.log('Error connecting to mongodb: ', err));