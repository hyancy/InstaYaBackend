// Importar mongoose
const mongoose = require('mongoose');
// Crear el modelo de Servicios con la funcion Schema de mongoose
const ordenesSchema = mongoose.Schema({
  // user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  datos_orden_envio: {
    tipo_paquete: { type: String, required: [true, 'Tipo de paquete requerido'], label: 'Tipo de paquete' },
    fecha_recogida: { type: Date, required: [true, 'Ingrese fecha de recogida del paquete'], label: 'Fecha de recogida' },
    Horario_recogida: { type: String, required: [true, 'Ingrese franja horaria para recoger paquete'], label: 'Horario de recogida' },
    ciudad_recogida: { type: String, required: [true, 'Ingrese la ciudad de donde se envía el paquete'], label: 'Ciudad de recogida' },
    barrio_recogida: { type: String, required: [true, 'Ingrese el barrio de la dirección de envio del paquete'], label: 'Barrio' },
    direccion_recogida: { type: String, required: [true, 'Ingrese la dirección de envio del paquete'], label: 'Dirección de envio' },
    nombre_remitente: { type: String, required: [true, 'Ingrese nombre de quien envía el paquete'], label: 'Remitente' },
    documento_remitente: { type: String, required: [true, 'Ingrese documento de quien envía el paquete'], label: 'Documento de remitente' },

    datos_paquete: {
      dimensiones: {
        ancho: { type: Number, required: [true, 'Ingrese dimesiones del paquete'], label: 'ancho' },
        alto: { type: Number, required: [true, 'Ingrese dimesiones del paquete'], label: 'alto' },
        largo: { type: Number, required: [true, 'Ingrese dimesiones del paquete'], label: 'largo' },
      },

      delicado: { type: Boolean, required: [true, 'Ingresesi el paquete es o no delicado'], default: true,  label: 'Delicado o no delicado' },
      peso_aprox: { type: Number, required: [true, 'Ingrese el peso del paquete'], label: 'peso aproximado' },
    },

    fecha_entrega: { type: Date, required: [true, 'Ingrese fecha de recogida del paquete'], label: 'Fecha de entrega'},
    Horario_entrega: { type: String, required: [true, 'Ingrese franja horaria para la entrega del paquete'], label: 'Horario de entrega'},
    ciudad_entrega: { type: String, required: [true, 'Ingrese la ciudad de donde se entregara el paquete'], label: 'Ciudad de destino'},
    barrio_entrega: { type: String, required: [true, 'Ingrese el barrio de la dirección del destino del paquete'], label: 'Barrio'},
    direccion_entrega: { type: String, required: [true, 'Ingrese la dirección de destino del paquete'], label: 'Direccion'},
    nombre_destinatario: { type: String, required: [true, 'Ingrese nombre de quien recibirá el paquete'], labe: 'Destinatario' },
    documento_destinatario: { type: String, required: [true, 'Ingrese documento de quien recibirá el paquete'], label:'Documento' },
    estado_pedido: { type: String, required: true, default: 'guardado' }
  },
  _v: false
});


// Exportar modelo de orden de envio
module.exports = mongoose.model('Order', ordenesSchema);