const mongoose = require('mongoose');
require('dotenv').config();

const conectarDB = async () => {
    try {
        // Usamos la URL que copiaste de Atlas y guardaste en el .env
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log('✅ Conexión exitosa a MongoDB Atlas');
    } catch (error) {
        console.error('❌ Error de conexión:', error.message);
        // Matamos el proceso si no hay base de datos, porque el chat no funcionaría
        process.exit(1); 
    }
};

module.exports = conectarDB; 