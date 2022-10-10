// Importar mongoose
const mongoose = require('mongoose');
// Crear el modelo de usuario con la funcion Schema de mongoose
const userSchema = mongoose.Schema({
  name: { type: String },

  username: { type: String, unique: true },

  email: { type: String },

  password: { type: String },

  activate: { type: Boolean, default: true },

  role: { type: String, enum: ['ADMIN', 'USER'], default: 'USER' },

  orders: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }
},
  {
    timestamps: true,
    versionKey: false,
  });

// Exportar modelo de usuario
module.exports = mongoose.model('User', userSchema);
