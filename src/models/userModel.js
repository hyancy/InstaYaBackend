// Importar mongoose
const mongoose = require('mongoose');
// Crear el modelo de usuario con la funcion Schema de mongoose
// Importar modulo para encriptar la contraseña
// const bcrypt = require('bcrypt-nodejs');


const userSchema = mongoose.Schema({
    name: { type: String },

    username: { type: String, required: [true, 'Ingrese userName'], unique: true },

    email: { type: String, required: [true, 'Ingrese email'] },

    password: { type: String, required: [true, 'Ingrese password'], select: false },

    activate: { type: Boolean, required: [true], default: true }
});

// userSchema.pre('save', (next) => {
//     let user = this;
//     // if (!user.isModified('password')) return next()

//     bcrypt.genSalt(10, (err, salt) => {
//         if (err) return next(err);

//         bcrypt.hash(user.password, salt, null, (err, hash) => {
//             if (err) return next(err);

//             user.password = hash;
//             next();
//         });
//     });
// });

// const options = { timestamps: true };

// Exportar modelo de usuario
module.exports = mongoose.model('User', userSchema);
