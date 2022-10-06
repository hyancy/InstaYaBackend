const express = require('express');
const router = express.Router();
const {User} = require('../models/userModel');
const Joi = require("joi");
const bcrypt = require("bcrypt");

router.post('/signin', async (request, response) =>{
    try{
        const {error} = validate(request.body);
        if(error)
            return response.status(400).send({ message:error.details[0].message });

        const user = await User.findOne({ User: request.body.User});
        if (!user)
            return response.status(401).send({ message: "Usuario o contraseña inválidos" });

        const validPassword = await bcrypt.compare(
            request.body.Password, user.Password,
        );
        if (!validPassword)
            return response.status(401).send({ message:"Usuario o contraseña inválidos" });

        const token = user.generateAuthToken();
        response.status(200).send({accestoken:token});
    } catch(error){
        response.status(500).send({message:"Error interno"});
    }
});

const validate = (data) => {
    const schema = Joi.object({
        User: Joi.string().required().label("User"),
        Password: Joi.string().required().label("Password")
    });
    return schema.validate(data);
}

module.exports = router