const express = require('express');
const http = require('http');
const moment = require('moment');

const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'], 
  } });

io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id} `);
  
  socket.on('message', ({ chatMessage, nickname }) => {
    const messageDate = new Date();

    const formatedDate = moment(messageDate).format('DD-MM-yyyy HH:mm:ss');

    const message = `${formatedDate} - ${nickname}: ${chatMessage}`;

    io.emit('message', message);
  });
});

server.listen(3000, () => {
  console.log('Servidor iniciado em http://localhost:3000');
});

module.exports = { io };