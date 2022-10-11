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
const { ApiError } = require('../../utils/ApiError')

router.post('/signin', async (req, res, next) => {
  try {
    // Obtener datos de ingreso del usuario
    let { username, password } = req.body
    //Validar datos de ingreso del usuario
    if (!username || !password) {
        res.status(400).send({message: "error"})
    }else{

    const user = await userSchema.findOne({ username });

    if (user == null){
        return res.status(400).send({error: "el usuario no existe"})
    }

    const match = await bcrypt.compare(password, user.password)

    if (match) {
      const accessToken = jwt.sign(user.name, process.env.JWT_SECRET)
      res.status(200).json({ accessToken: accessToken });
      console.log(`El usuario: ${user.name} ha realizado un inicio de sesión exitosamente `);
      req.session.user = user;
      // res.send(user)
    }else{
      res.status(400).json({ message: "No existe el usuario" });
    }
    }
    // Validar si el usuario existe en la base de datos
     

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
    const { name, username, email, password } = req.body;
    // Validar los datos para el registro del usuario nuevo
    if (!(email && password && name && username )) {
      throw res.status(400).send({ error: "Debe llenar todos los datos" });
    } else {
      // Validamos la existencia del usuario en la base de datos
      const oldUser = await userSchema.findOne({ username });

      if (oldUser) {
        return res.status(400).send({error: "El usuario ya existe"})
      }

      const user = userSchema(req.body);
      const hashedPassword = await bcrypt.hash(req.body.password, 12)
      user.password = hashedPassword
      // user.password
      user.save()
        .then(() => res.status(200))
        .catch((error) => console.error({ message: error }))
      console.log('Se ha agregado un nuevo usuario');
      res.status(200).send({message: "usuario creado con exito"})
    }
  } catch (error) {
      console.log(error)
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
