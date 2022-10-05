// Importar mongoose
const mongoose = require('mongoose');
// Crear el modelo de Servicios con la funcion Schema de mongoose

const serviceSchema = mongoose.Schema({
  user: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
datos_servicio: {
    datos_recogida: {
      tipo_paquete: { type: String, required: true},
      fecha_recogida: { type: Date, required: true },
      franja_Horaria_recogida: { type: String, required: true },
      ciudad_recogida: { type: String, required: true },
      barrio_recogida: { type: String, required: true },
      direccion_recogida: { type: String, required: true },
      persona_envia: {
        nombre: { type: String, required: true },
        documento: { type: String, required: true }
      }
    },

    datos_paquete: {
      dimensiones: {
        ancho: { type: Number, required: true },
        alto: { type: Number, required: true },
        largo: { type: Number, required: true }
      },

      delicado: {
        type: Boolean, required: true
      },
      peso_aprox: { type: Number, required: true }
    },

    datos_entrega: {
      fecha_entrega: { type: Date, required: true },
      franja_Horaria_entrega: { type: String, required: true },
      ciudad_entrega: { type: String, required: true },
      barrio_entrega: { type: String, required: true },
      direccion_entrega: { type: String, required: true },
      persona_recibe: {
        nombre: { type: String, required: true },
        documento: { type: String, required: true }
      }
    }
  }
});

const options = { timestamps: true, };

// Exportar modelo de Servicio
module.exports = mongoose.model('Service', serviceSchema, "services", options);