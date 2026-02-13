const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').Server(app); 
const routerUser = require('./router/userRouter');
const conectarDB = require('./config/db');
const socketController = require('./sock');

const PORT = 2000;

conectarDB();

const corsOptions = {
  origin: "http://localhost:4200",
    credentials: true,
    allowedHeaders: [
        'Content-Type', 
        'Authorization', 
        'x-auth-token' // <--- ESTO ES LO QUE FALTA
    ]
};

app.use(cors(corsOptions));
app.use(express.json());

const io = require('socket.io')(server, {cors: {
    origin: "http://localhost:4200", // Permite todos los dominios
    methods: ["GET", "POST"], // Métodos permitidos
    credentials: true // Permite el envío de cookies/headers de sesión si fuera necesario
  }});
io.on('connect',socketController);



app.use("/", routerUser);

server.listen(PORT, () => {
    console.log(`Servidor con WebSockets escuchando en el puerto ${PORT}`);
});