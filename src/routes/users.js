const express = require('express');
const router = express.Router();
const userSchema = require('../models/User');
const bcrypt = require("bcrypt");
const app = express();
const { validationResult } = require('express-validator');
const ApiError = require('../../utils/ApiError');
const notFound = require('../../middleware/notFound');
const handleErrors = require('../../middleware/handleErrors');
const { authenticateToken }  = require('../../middleware/authMiddleware');

// Crear los endpoints/rutas para la API que tenga los metodos HTTP (CRUD)
// Crear función para crear un usuario nuevo (metodo POST)
// router.post('/users', async (req, res) => {
//     const user = userSchema(req.body);
//     const hashedPassword = await bcrypt.hash(req.body.password, 12)
//     user.password = hashedPassword
//     // user.password
//     user.save()
//         .then(() => {
//             res.json({error: false, message: "user created"})
//         })
//         .catch( (error) => {
//             console.error({ message: error });
//             res.send({error: true, message: "user not created"});
//         }
// )
//     console.log(`Se ha agregado un nuevo usuario`);

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
router.get('/users', authenticateToken, (req, res) => {
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


router.get("/Login/findAllOrders", authenticateToken, (req, res, next) => {
  orders.find({}).populate('user', {
    username: 1,
  }).exec()
    .then((data) => { res.status(200).json(data) })
    .catch((error) => {
      console.log(error)
      res.status(404).json({ message: "Not data found" });
    })

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
