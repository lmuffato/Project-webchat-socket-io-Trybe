const express = require('express');
const path = require('path');
const moment = require('moment');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const timestamp = moment().format('DD-MM-YYYY HH:mm');
const http = require('http').createServer(app);

const corsOptions = {
  origin: `http://localhost:${PORT}`,
  methods: ['GET', 'POST'],
};
const io = require('socket.io')(http, corsOptions);

app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public', 'views'));

const users = {};
io.on('connection', async (socket) => { 
  users[socket.id] = socket.id.slice(0, 16);

  socket.on('message', async ({ chatMessage, nickname }) => {
    io.emit('message', `${timestamp} - ${nickname} : ${chatMessage}`);
  });
  socket.on('newNickname', (nickname) => {
    users[socket.id] = nickname;
    io.emit('usersList', Object.values(users));
  });

  io.emit('usersList', Object.values(users));

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