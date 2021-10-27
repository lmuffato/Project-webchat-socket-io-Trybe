const express = require('express');
const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'], 
  }});

io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id} `);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/view/chat.html');
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
