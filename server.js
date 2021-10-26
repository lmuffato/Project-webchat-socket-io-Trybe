// Faça seu código aqui
const express = require('express');
const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const message = `26-10-2021 3:40:06 PM - ${nickname}: ${chatMessage}`;
    console.log(message);
    io.emit('message', message);
  });
  console.log(`Usuário conectado. ID: ${socket.id} `);
  socket.on('disconnect', () => {
    console.log(`usuario ${socket.id} desconectado`)
  });
});

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

http.listen(3000, () => console.log('aplicação rodando na porta 3000'));