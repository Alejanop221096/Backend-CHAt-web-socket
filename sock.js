const Chat = require('./model/chat');

// Mantenemos una lista de usuarios conectados en memoria (puedes usar Redis después)
let usuariosOnline = []; 

const socketController= (socket) => {

        console.log("Cliente conectado:", socket.id);
            
//actualizar el estado
        socket.on('user-conectado-list',(payload)=>{
            
            socket.usuarioRealId = payload;
            
            if(!usuariosOnline.includes(socket.usuarioRealId)){
                
                    usuariosOnline.push(socket.usuarioRealId);
            }
            
            socket.broadcast.emit('lista-conectados',usuariosOnline);
            socket.emit('lista-conectados',usuariosOnline);


             

        });
//actualiza el estado

        socket.on('disconnect', () => {
        console.log("Cliente desconectado:", socket.usuarioRealId);
        
        if (socket.usuarioRealId) {
            // Sacamos al usuario de la lista
            usuariosOnline = usuariosOnline.filter(id => id !== socket.usuarioRealId);
            
            // Avisamos a los que se quedan que la lista cambió
            socket.broadcast.emit('lista-conectados', usuariosOnline);
        }
    });


    

            


    

   
    
}

module.exports = socketController;