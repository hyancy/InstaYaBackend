// Importar Express
const express = require('express');
// Crear enrutador principal para el Routing, usar el metodo Router de Express
const router = express.Router();
// Importar modelo de datos userSchema
const userSchema = require('../models/userModel');

// Crear los endpoints/rutas para la API que tenga los metodos HTTP (CRUD)
// Crear función para crear un usuario nuevo (metodo POST)
router.post('/users', (req, res) => {
    const user = userSchema(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) => console.error({ message: error }))
});

// Crear funcion para obtener todos los usuarios (metodo GET)
router.get('/users', (req, res) => {
    userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => console.log({ message: error }))
});

// Crear funcion para obtener 1  usuario (metodo GET)
router.get('/users/:id', (req, res) => {
    const { id } = req.params;
    userSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => console.log({ message: error }))
});

// Crear funcion para actualizar 1 usuario (metodo PUT)
router.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name:nombres, name:apellidos, username, email, password } = req.body;
    userSchema
        .updateOne({ _id: id }, { $set: { "name.nombres":nombres,"name.nombres":apellidos, username, email, password }})
        .then((data) => res.json(data))
        .catch((error) => console.log({ message: error }))
});

// Crear funcion para eliminar 1 usuario (metodo DELETE)
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    userSchema
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => console.log({ message: error }))
});

//Exportar el enrutador creado
module.exports = router;
