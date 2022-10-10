// Importar Express
const express = require('express');
// Crear el enrutador principal para en Routing, usar el metodo Router e express
const router = express.Router();
// Impotar mongoose
const mongoose = require('mongoose');
// Importar modelo de datos ordeneschema
const ordeneschema = require('../models/Order');
// Implementar funcion express 
const app = express();
// Importar modulos para manejo de errores y validation
const { validationResult } = require('express-validator');
const ApiError = require('../../utils/ApiError');
const notFound = require('../../middleware/notFound');
const handleErrors = require('../../middleware/handleErrors');

// Crear los endpoints/rutas para la API que tenga los metodos HTTP (CRUD)
// Crear función para crear un servicio nuevo (POST)
router.post('/crearOrden', (req, res) => {
  try {
    const send = ordeneschema(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError("Debe ingresar datos válidos", 400)
        .res.json({ error: errors.array() });
    } else {
      console.log('Guardado envío: ' + req.params.id);
      send
        .save()
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((error) => console.error({ message: error }))
    }
  } catch (e) {
    console.log({ message: error });
    res.status(500).send({ message: "Error interno del servidor" });
  }
});

// Crear funcion para obtener todos los servicios (metodo GET)
router.get('/ordenes', (req, res) => {
  try {
    ordeneschema
      .find({}).populate('user', {
        username: 1,
      })
      .then((data) => res.status(200).json(data))
      .catch((error) => console.log({ message: error }));
  } catch (error) {
    console.log({ message: error });
    res.status(500).send({ message: "Error interno del servidor" });
  }
});

// Crear función para obtener los servicios entregados (metodo GET)
router.get('/orders/delivery', (req, res) => {
  try {
    const { sends } = ordeneschema.find({ estado_pedido: "Guardado" });
    ordeneschema
      .find(sends)
      .then((sends) => res.status(200).json(sends))
      .catch((error) => console.log({ message: error }));
  } catch (error) {
    console.log({ message: error });
    res.status(500).send({ message: "Error interno del servidor" });
  }
});

// Crear funcion para obtener 1  servicio (metodo GET)
router.get('/ordenes/:id', (req, res) => {
  try {
    const { id } = req.params;
    ordeneschema
      .findById({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => console.log({ message: error }))
  } catch (error) {
  }

});

// Crear funcion para actualizar 1 servicio (metodo PUT)
router.put('/editarOrden/:id', (req, res) => {
  try {
    const { id } = req.params;
    const cod_env = ordeneschema.findById({ _id: id });
    if (!cod_env) {
      throw new ApiError("Orden de envío no existe", 404)
        .res.json({ error: errors.array() });
    } else {
      console.log('Actualizado envío: ' + req.params.id);
      const {
        tipo_paquete,
        ancho_paquete,
        alto_paquete,
        largo_paquete,
        delicado,
        peso_aprox,
        fecha_recogida,
        Horario_recogida,
        ciudad_recogida,
        barrio_recogida,
        direccion_recogida,
        nombre_remitente,
        documento_remitente,
        fecha_entrega,
        Horario_entrega,
        ciudad_entrega,
        barrio_entrega,
        direccion_entrega,
        nombre_destinatario,
        documento_destinatario,
        estado_pedido,
      } = req.body;

      ordeneschema
        .updateOne({ _id: id }, {
          $set:
          {
            tipo_paquete,
            ancho_paquete,
            alto_paquete,
            largo_paquete,
            delicado,
            peso_aprox,
            fecha_recogida,
            Horario_recogida,
            ciudad_recogida,
            barrio_recogida,
            direccion_recogida,
            nombre_remitente,
            documento_remitente,
            fecha_entrega,
            Horario_entrega,
            ciudad_entrega,
            barrio_entrega,
            direccion_entrega,
            nombre_destinatario,
            documento_destinatario,
            estado_pedido,
          }
        })
        .then((data) => res.status(200).json(data))
        .catch((error) => console.log({ message: error }))
    }
  } catch (error) {
    console.log({ message: error });
    res.status(500).esend({ message: "Error interno del servidor" });
  }
});

// Crear funcion para eliminar 1 servicio (metodo PATCH)
// router.delete('/ordenes/:id', (req, res) => {
//   try {
//     cod_env = ordeneschema.findById({ _id: id });
//     if (!cod_env) {
//       throw new ApiError("Orden de envío no existe", 404)
//         .res.json({ error: errors.array() });
//     } else {
//       console.log('Borrado envío: ' + req.params.id);
//       const { id } = req.params;
//       ordeneschema
//         .deleteOne({ _id: id })
//         .then((data) => res.status(200).json(data))
//         .catch((error) => console.log({ message: error }))
//     }
//   } catch (error) {
//     console.log({ message: error });
//     res.status(500).send({ message: "Error interno del servidor" });
//   }
// });

router.patch('/ordenes/:id', (req, res) => {
  try {
    const { id } = req.params;
    const cod_env = ordeneschema.findById({ _id: id });
    if (!cod_env) {
      throw new ApiError("Orden de envío no existe", 404)
        .res.json({ error: errors.array() });
    } else {
      console.log('Actualizado envío: ' + req.params.id);
      const {
        estado_pedido = req.params.estado_pedido
      } = req.body;

      ordeneschema
        .updateOne({ _id: id }, {
          $set:
          {
            estado_pedido
          }
        })
        .then((data) => res.status(200).json(data))
        .catch((error) => console.log({ message: error }))
    }
  } catch (error) {
    console.log({ message: error });
    res.status(500).esend({ message: "Error interno del servidor" });
  }
});

app.use(notFound);
app.use(handleErrors);
//Exportar el enrutador creado
module.exports = router;
