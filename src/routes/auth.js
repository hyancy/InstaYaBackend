// Importar express
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const userSchema = require('../models/User');
const app = express();
const jwt = require('jsonwebtoken');
const notFound = require('../../middleware/notFound');
const handleErrors = require('../../middleware/handleErrors');
const { authenticateToken } = require('../../middleware/authMiddleware')

router.post('/signin', async (req, res, next) => {
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
      // const accessToken = generateAccessToken(user._id, user.username);
      const accessToken = jwt.sign(user.name, process.env.JWT_SECRET)
      res.status(200).json({ accessToken: accessToken });
      console.log(`El usuario: ${user.name} ha realizado un inicio de sesión exitosamente desde ${req.socket.remoteAddress}`);
      req.session.user = user;
      // res.send(user)
    } else {
      res.status(401).json({ message: "Usuario o contraseña no existen" });
    }

  } catch (error) {
    next(error);
    console.log(error)
    res.status(500).send({ message: "Error interno en el servidor" });
  }
});

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



const posts = [
  {username : "Bob" , title:"superman" , serial : 1},
  {username : "Allen" , title:"Batman" , serial : 2},
  {username : "xhlar" , title:"Iron Man" , serial : 3}
 ];

router.get("/posts", authenticateToken , (req,res)=>{
    res.json(posts.filter((post)=>  post.username == req.user));
    });




//Logout
router.post("/logout", (req, res, next)=>{
  req.session.user = null;
  return res.send("DONE");
});

app.use(notFound);
app.use(handleErrors);


module.exports = router;
