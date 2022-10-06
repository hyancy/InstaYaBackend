// Importar Express
const express = require('express');
// Crear el enrutador principal para en Routing, usar el metodo Router e express
const router = express.Router();
// Importar modelo de datos ordeneschema
const ordeneschema = require('../models/ordenModel');

// Crear los endpoints/rutas para la API que tenga los metodos HTTP (CRUD)
// Crear función para crear un servicio nuevo (POST)
router.post('/ordenes', (req, res) => {
    const service = ordeneschema(req.body);
    service
        .save()
        .then((data) => res.json(data))
        .catch((error) => console.error({ message: error }))
});

// Crear funcion para obtener todos los servicios (metodo GET)
router.get('/ordenes', (req, res) => {
    ordeneschema
        .find()
        .then((data) => res.json(data))
        .catch((error) => console.log({ message: error }))
});

// Crear funcion para obtener 1  servicio (metodo GET)
router.get('/ordenes/:id', (req, res) => {
    const { id } = req.params;
    ordeneschema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => console.log({ message: error }))
});

// Crear funcion para actualizar 1 servicio (metodo PUT)
router.put('/ordenes/:id', (req, res) => {
    const { id } = req.params;
    const { name: nombres, name: apellidos, username, email, password } = req.body;
    ordeneschema
        .updateOne({ _id: id }, { $set: { "name.nombres": nombres, "name.nombres": apellidos, username, email, password } })
        .then((data) => res.json(data))
        .catch((error) => console.log({ message: error }))
});

// Crear funcion para eliminar 1 servicio (metodo DELETE)
router.delete('/ordenes/:id', (req, res) => {
    const { id } = req.params;
    ordeneschema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => console.log({ message: error }))
});

//Exportar el enrutador creado
module.exports = router;
