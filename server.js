require('dotenv').config();

const { Server } = require('socket.io');
const express = require('express');

const app = express();
const http = require('http').createServer(app);

// ------------------------------------------------------------------------------------------//

const io = new Server(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => { 
    console.log(`Usuário conectado. ID: ${socket.id} `);
});
  
// ------------------------------------------------------------------------------------------//

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log(`Socket online na ${PORT}, acessar: http://localhost:3000`);
});

// http: cria o servidor
// createServer(app): conecta o client e o servidor para trabalharem juntos
// cors: conexão e métodos
