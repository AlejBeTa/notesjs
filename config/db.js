const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {  });
        console.log('DB conectada');
    } catch (error) {
        console.log("Error de conexion a la DB, revisar variables de entorno");
        process.exit(1);
    }   
}

module.exports = connectDB;