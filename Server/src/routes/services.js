// Importar Express
const express = require('express');
// Crear el enrutador principal para en Routing, usar el metodo Router e express
const router = express.Router();
// Importar modelo de datos serviceSchema
const serviceSchema = require('../models/serviceModel');

// Crear los endpoints/rutas para la API que tenga los metodos HTTP (CRUD)
// Crear función para crear un servicio nuevo (POST)
router.post('/services', (req, res) => {
    const service = serviceSchema(req.body);
    service
        .save()
        .then((data) => res.json(data))
        .catch((error) => console.error({ message: error }))
});

// Crear funcion para obtener todos los servicios (metodo GET)
router.get('/services', (req, res) => {
    serviceSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => console.log({ message: error }))
});

// Crear funcion para obtener 1  servicio (metodo GET)
router.get('/services/:id', (req, res) => {
    const { id } = req.params;
    serviceSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => console.log({ message: error }))
});

// Crear funcion para actualizar 1 servicio (metodo PUT)
router.put('/services/:id', (req, res) => {
    const { id } = req.params;
    const { name: nombres, name: apellidos, username, email, password } = req.body;
    serviceSchema
        .updateOne({ _id: id }, { $set: { "name.nombres": nombres, "name.nombres": apellidos, username, email, password } })
        .then((data) => res.json(data))
        .catch((error) => console.log({ message: error }))
});

// Crear funcion para eliminar 1 servicio (metodo DELETE)
router.delete('/services/:id', (req, res) => {
    const { id } = req.params;
    serviceSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => console.log({ message: error }))
});

//Exportar el enrutador creado
module.exports = router;
