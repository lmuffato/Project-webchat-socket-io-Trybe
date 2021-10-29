const express = require('express');
const path = require('path');

const app = express();

const server = require('http').createServer(app);

const { Server } = require('socket.io');
const moment = require('moment');

const io = new Server(server);

const PORT = 3000;

app.use(express.static('./public'));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public/chat.html'));
});
io.on('connection',
/**
 * @param {import('socket.io').Socket} socket
 */
(socket) => {
  console.log('Usuário conectado');
  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
  socket.on('message', ({ chatMessage, nickname }) => {
    const msgTime = moment().format('DD-MM-yyyy HH:mm'); 
    io.emit('message', `${msgTime} ${nickname} ${chatMessage}`);
  });
});

server.listen(PORT, () =>
  console.log(`Server WebChat Online na porta ${PORT}`));
