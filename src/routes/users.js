// Importar Express
const express = require('express');
// Crear enrutador principal para el Routing, usar el metodo Router de Express
const router = express.Router();
// Importar modelo de datos userSchema
const userSchema = require('../models/User');
// Importar modulo para encryptedPassword
const bcrypt = require("bcrypt");
// Implementar funcion express 
const app = express();
// Importar modulos para manejo de errores y validation
const { validationResult } = require('express-validator');
const ApiError = require('../../utils/ApiError');
const notFound = require('../../middleware/notFound');
const handleErrors = require('../../middleware/handleErrors');

// Crear los endpoints/rutas para la API que tenga los metodos HTTP (CRUD)
// Crear función para crear un usuario nuevo (metodo POST)
// Registro de nuevos usuarios 
router.post("/signup", async (req, res, next) => {
  try {
    // Obtener datos para el registro del un nuevo usuario 
    const { name, username, email, password, passwordConfirmation } = req.body;
    // Validar los datos para el registro del usuario nuevo
    if (!(email && password && name && username && passwordConfirmation)) {
      throw new ApiError("Debe llenar todos los datos", 400);
    } else if (password !== passwordConfirmation) {
      throw new ApiError("Las contraseñas no coinciden", 400);
    } else {
      // Validamos la existencia del usuario en la base de datos
      const oldUser = await userSchema.findOne({ username });
      console.log(oldUser);

      if (oldUser) {
        throw new ApiError("El usuario ya existe. Por favor haga Login", 400);
      }
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 12);

      // Creamos un usuario en la DB
      // const user = await userSchema.create({
      //   name,
      //   username,// sanitize: convert username to lowercase
      //   email,
      //   password: encryptedPassword,
      // });
      // res.status(200).json(user);

      const user = userSchema(req.body);
      const hashedPassword = await bcrypt.hash(req.body.password, 12)
      user.password = hashedPassword
      // user.password
      user.save()
        .then((data) => res.json(data))
        .then(() => res.status(200))
        .catch((error) => console.error({ message: error }))
      console.log('Se ha agregado un nuevo usuario');
    }
  } catch (error) {
    next(error);
    console.log(error);
  }

});
// router.post('/users', async (req, res) => {
//     try {
//         const idExist = await userSchema.findOne({ _id: req.body.id });
//         const errorsValidation = validationResult(req);
//         if (!errorsValidation.isEmpty()) {
//             throw new ApiError("Debe ingresar datos válidos", 400)
//                 .res.json({ error: errorsValidation.array() });
//         } else {
//             if (idExist) {
//                 return res.status(405).json({ message: "Usuario existe" });
//             }
//             const usernameExist = await userSchema.findOne({ username: req.body.username });
//             if (usernameExist) {
//                 return res.status(405).json({ message: "Username existe" });
//             } else {

//                 const user = userSchema(req.body);
//                 const hashedPassword = await bcrypt.hash(req.body.password, 12)
//                 user.password = hashedPassword
//                 // user.password
//                 user.save()
//                     .then((data) => res.json(data))
//                     .then(() => res.status(200))
//                     .catch((error) => console.error({ message: error }))
//                 console.log('Se ha agregado un nuevo usuario');
//             }
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Error interno del servidor" });
//     }
// });

// Crear funcion para obtener todos los usuarios (metodo GET)
router.get('/users', (req, res) => {
  try {
    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      throw new ApiError("Not found", 400)
        .res.json({ error: errorsValidation.array() });
    } else {
      userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => console.log({ message: error }))
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});


// // Crear funcion para obtener 1  usuario (metodo GET)
// router.get('/users/:id', (req, res) => {
//     try {
//         const errorsValidation = validationResult(req);
//         if (!errorsValidation.isEmpty()) {
//             throw new ApiError("Not found", 400)
//                 .res.json({ error: errorsValidation.array() });
//         } else {
//             const { id } = req.params;
//             userSchema
//                 .findById(id)
//                 .then((data) => res.json(data))
//                 .catch((error) => console.log({ message: error }))
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Error interno del servidor" });
//     }
// });

// // Crear funcion para actualizar 1 usuario (metodo PUT)
// router.put('/users/:id', async (req, res) => {
//     try {
//         const errorsValidation = validationResult(req);
//         if (!errorsValidation.isEmpty()) {
//             throw new ApiError("Debe ingresar datos válidos", 400)
//                 .res.json({ error: errorsValidation.array() });
//         } else {
//             const { id } = req.params; // *username

//             const {
//                 name,
//                 username,
//                 email,
//                 password,
//             } = req.body;
//             // const user = userSchema(req.body);
//             // const hashedPassword =  await bcrypt.hash(req.params.password, 12)
//             // user.password = hashedPassword
//             user
//                 .updateOne({ _id: id }, {
//                     $set:
//                     {
//                         name,
//                         username,
//                         email,
//                         password,
//                     }
//                 })
//                 .then((data) => res.json(data))
//                 .catch((error) => console.log({ message: error }))
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Error interno del servidor" });
//     }

// });

// Crear funcion para eliminar 1 usuario (metodo DELETE)
// router.delete('/users/:id', (req, res) => {
//     try {
//         const errorsValidation = validationResult(req);
//         if (!errorsValidation.isEmpty()) {
//             throw new ApiError("Not found", 400)
//                 .res.json({ error: errorsValidation.array() });
//         } else {
//             const { id } = req.params;
//             userSchema
//                 .deleteOne({ _id: id })
//                 .then((data) => res.json(data))
//                 .catch((error) => console.log({ message: error }))
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Error interno del servidor" });
//     }
// });
// Crear funcion para eliminar 1 usuario (metodo PATCH)
router.patch('/users/:id', (req, res) => {
  try {
    const { id } = req.params;
    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      throw new ApiError("Not found", 400)
        .res.json({ error: errorsValidation.array() });
    } else {
      const {
        activate
      } = req.body;
      userSchema
        .updateOne({ _id: id }, {
          $set:
          {
            activate
          }
        })
        .then((data) => res.json(data))
        .catch((error) => console.log({ message: error }))
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

app.use(notFound);
app.use(handleErrors);

//Exportar el enrutador creado
module.exports = router;
