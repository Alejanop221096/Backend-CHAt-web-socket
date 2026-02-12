const Chat = require('./model/chat');

// Mantenemos una lista de usuarios conectados en memoria (puedes usar Redis después)
let usuariosOnline = []; 

const socketControler = (socket) => {
    // El socket ya está conectado aquí


    socket.on("ultimo-chat", async (payload) => {
        // 1. Guardamos el ID real de Mongo en el objeto socket para identificarlo
        socket.uid = payload.id; 

        // 2. Agregamos al usuario a nuestra lista si no está
        if (!usuariosOnline.includes(socket.uid)) {
            usuariosOnline.push(socket.uid);
        }

        // 3. Avisar a los DEMÁS que este usuario entró (para que cambien a Online)
        socket.broadcast.emit('user-conectado', socket.uid);

        // 4. IMPORTANTE: Avisar al USUARIO ACTUAL quiénes están conectados ahora mismo
        // Esto arregla que la segunda ventana vea a la primera
        socket.emit('lista-usuarios-preevios', usuariosOnline);

        // 5. Enviar los últimos mensajes
        const chatRes = await Chat.find().sort({ _id: -1 }).limit(10);
        socket.emit('cargar-mensajes', chatRes);
    });

    socket.on('disconnect', () => {
        // Limpiamos la lista al desconectar
        usuariosOnline = usuariosOnline.filter(id => id !== socket.uid);
        socket.broadcast.emit('user-desconectado', socket.uid);
    });
}

module.exports = socketControler;