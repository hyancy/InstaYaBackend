const { Router } = require('express'); //llama a la libreria router que permite entregar rutas
const router = Router();
const { generateAccessToken } = require('../../services/jwt');
const User = require('../models/User');
const orders = require('../models/Order');
const bcrypt = require("bcrypt");
const { authMiddleware } = require('../../middleware/authMiddleware');




router.post("/login", async (req, res, next) => {

  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      res.status(400).json({ message: "All input is required" });
    }
    // Validate if user exist in our database
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {

      const accessToken = generateAccessToken(user._id, user.username);
      res.status(200).json({ accessToken });
    } else {
      res.status(404).json({ message: "User not found" });
    }

  } catch (err) {
    next(err);
    console.log(err);
  }
});

router.get("/login/findAll", authMiddleware, (req, res, next) => {

  orders.find().exec()
    .then((docs) => {
      res.status(200).json(docs); //
    })
    .catch((error) => {
      console.log(error)
      res.status(404).json({ message: "Not data Found" });
    })

});

module.exports = router;