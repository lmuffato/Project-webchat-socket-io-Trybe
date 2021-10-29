const express = require('express');
const path = require('path');

const app = express();

const server = require('http').createServer(app);

const { Server } = require('socket.io');
const moment = require('moment');
const msg = require('./models/messages');

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
async (socket) => {
  console.log('Usuário conectado');
  const dbMessages = await msg.getAllMessages();
  socket.emit('dbMessages', dbMessages);
  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
  socket.on('message', async ({ chatMessage, nickname }) => {
    const msgTime = moment().format('DD-MM-yyyy HH:mm:ss'); 
    await msg.createMsg({ message: chatMessage, nickname, timestamp: msgTime });
    io.emit('message', `${msgTime} ${nickname} ${chatMessage}`);
  });
  socket.on('listUser', (user) => {
    socket.emit('listUser', user);
    socket.broadcast.emit('listUser', `Bem vindo, ${user}`);
  });
});

server.listen(PORT, () =>
  console.log(`Server WebChat Online na porta ${PORT}`));
