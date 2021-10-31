const express = require('express');
const path = require('path');
const moment = require('moment');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const timestamp = moment().format('DD-MM-YYYY HH:mm');
const http = require('http').createServer(app);

const corsOptions = {
  cors: {
  origin: `http://localhost:${PORT}`,
  methods: ['GET', 'POST'],
  },
};

const { Server } = require('socket.io');

const io = new Server(http, corsOptions);
const { getAllChatMessages, saveMessage } = require('./models/chat');

app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public', 'views'));

const users = {};
io.on('connection', async (socket) => { 
  console.log(socket.id);
  users[socket.id] = socket.id.slice(0, 16);

  socket.on('message', async ({ chatMessage, nickname }) => {
    io.emit('message', `${timestamp} - ${nickname} : ${chatMessage}`);
    await saveMessage({ timestamp, nickname, chatMessage });
  });

  socket.on('newNickname', (nickname) => {
    users[socket.id] = nickname;
    io.emit('usersList', Object.values(users));
  });

  io.emit('usersList', Object.values(users));

  const historyMsg = async () => getAllChatMessages().then((data) => data);

  socket.emit('historyMsg', await historyMsg());

  socket.on('disconnect', () => {
    delete users[socket.id];
    io.emit('usersOnline', Object.values(users));
  });
});

app.get('/', (_req, res) => {
  res.render('index.ejs');
});

http.listen(PORT, () => console.log(`Socket online na ${PORT}
Acessar: http://localhost:${PORT}`));

// Este projeto foi realizado com ajuda de Guilherme Dornelles!