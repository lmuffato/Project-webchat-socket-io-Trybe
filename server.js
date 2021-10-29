// Faça seu código aqui
const path = require('path');
const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000/',
    method: ['GET, POST'],
  },
});
const { addMessage, findAllMessages } = require('./models/message');

app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', './views');
app.set('view engine', 'ejs');

const users = {};

const getDate = () => {
  const a = new Date();
  const formated = `${a.getDate()}-${a.getMonth()}-${a.getFullYear()}`
  + ` ${a.getHours()}:${a.getMinutes()}:${a.getSeconds()}`;
    return formated;
};

const onNewNickname = (nick, socket) => {
    users[socket.id] = nick;
    io.emit('allUsers', Object.values(users));
};

const onSendMessage = async ({ chatMessage, nickname }) => {
  const date = getDate();
  await addMessage({ message: chatMessage, nickname, timestamp: date });
  io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
};

io.on('connection', async (socket) => {
  const messages = await findAllMessages();
  users[socket.id] = socket.id.substring(0, 16);
  io.emit('allUsers', Object.values(users));

  socket.on('nickname', (nick) => onNewNickname(nick, socket));

  socket.on('message', (data) => onSendMessage(data));
  socket.on('disconnect', () => {
      delete users[socket.id];
      io.emit('allUsers', Object.values(users));
  });
  if (messages) {
    messages.forEach((message) => {
      socket.emit('previewMessages', `${message.timestamp} -` 
      + ` ${message.nickname}: ${message.message}`);
    });
  }
  socket.broadcast.emit('serverMessage', { message: 'Oba, alguem se conectou' });
});

app.get('/', (_req, res) => {
  res.render('./public/index.html');
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});