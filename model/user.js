const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true, // No permite correos repetidos
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: 6
    },
    avatar: {
        type: String,
        default: 'https://via.placeholder.com/150' // Foto por defecto
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    }
});

// Exportamos el modelo
module.exports = mongoose.model('User', UserSchema);