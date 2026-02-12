const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    de: String,
    para: String,
    mensaje: String,
    fecha: { type: Date, default: Date.now }
});

// ¡ESTA LÍNEA ES LA CLAVE!
module.exports = mongoose.model('Chat', ChatSchema);