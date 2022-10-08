// Importar express
const express = require('express');
// Importar modulo para Routing
const router = express.Router();
// Importar modulo para encryptedPassword
const bcrypt = require("bcrypt");
// Importar modelos (Schemas)
const userSchema = require('../models/User');
const orders = require('../models/Order');
// Implementar funcion express 
const app = express();
// Importar modulos para manejo de token, errores y validation
const { generateAccessToken } = require('../../services/jwt');
const { authMiddleware } = require('../../middleware/authMiddleware');
const notFound = require('../../middleware/notFound');
const handleErrors = require('../../middleware/handleErrors');

router.post('/Login', async (req, res, next) => {
  try {
    // Obtener datos de ingreso del usuario
    const { username, password } = req.body
    //Validar datos de ingreso del usuario
    if (!(username && password)) {
      res.status(400).json({ message: "Ingresar nombre de usuario y contraseña" });
    } 
    if (!username || !password) {
      res.status(400).json({ message: "Ingresar nombre de usuario y contraseña" });
    }
    // Validar si el usuario existe en la base de datos
    const user = await userSchema.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {

      const accessToken = generateAccessToken(user._id, user.username);
      console.log('Login exitoso');
      res.status(200).json({ accessToken });
    } else {
      res.status(401).json({ message: "Usuario o contraseña no existen" });
    }

  } catch (error) {
    next(error);
    console.log(error)
    res.status(500).send({ message: "Error interno en el servidor" });
  }
});

router.get("/Login/findAllOrders", authMiddleware, (req, res, next) => {
  orders.find().exec()
    .then((data) => {
      res.status(200).json(data); //
    })
    .catch((error) => {
      console.log(error)
      res.status(404).json({ message: "Not data found" });
    })

});

// if (!user)
//     return res.status(401).send({ message: "Usuario o contraseña inválidos" });

// const matchstatus = await bcrypt.compare(password, user.password);
// if (matchstatus == true) {
//     console.log('logged in!');
//     user.password = "";
//     return res.send(user);

// }
// else {
//     console.log('wrong id or password!');
//     return res.send({ error: "Wrong ID or Password" });
// }

app.use(notFound);
app.use(handleErrors);


module.exports = router
