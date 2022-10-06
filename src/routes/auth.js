const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const userSchema = require('../models/userModel');

router.post('/signin', async (request, response) =>{
        try{
        // const {error} = validate(request.body);
        // if(error){
        //         console.log("There's an error")
        //     return response.status(400).send({ message:error.details[0].message });
        // }
        //
        const { username, password }  = request.body
        const user = await userSchema.findOne({username}).select('+password');

        if (!user)
            return response.status(401).send({ message: "Usuario o contraseña inválidos" });

        const matchstatus = await bcrypt.compare(password, user.password);
        if(matchstatus == true){
        console.log('logged in!'); 
        user.password = "";
        return response.send(user);

        }
        else{
        console.log('wrong id or password!'); 
        return response.send({error: "Wrong ID or Password"});
        }



    } catch(error){
        console.log(error)
        response.status(500).send({message: "There's an error"});
    }
});

// const validate = (data) => {
//     const schema = Joi.object({
//         User: Joi.string().required().label("username"),
//         Password: Joi.string().required().label("password")
//     });
//     return schema.validate(data);
// }

module.exports = router
