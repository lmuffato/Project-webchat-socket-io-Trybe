require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const moment = require('moment');
// const path = require('path');
const { Server } = require('socket.io');
const webChatModel = require('./models/WebChat');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

// app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cors());

const serverHttp = http.createServer(app);

const options = {
  cors: {
    origin: process.env.BACKEND_URL,
    methods: ['GET', 'POST'],
  },
};

const io = new Server(serverHttp, options);
const users = {};

io.on('connection', (socket) => {
  console.log(`usuário ${socket.id} conectado!`);
  users[socket.id] = socket.id.slice(0, 16);

  socket.on('nickname', (nickname) => {
    users[socket.id] = nickname;
    io.emit('nickname', Object.values(users));
    // console.log(users);
  });

  socket.on('message', async ({ nickname, chatMessage }) => {
    const timestamp = moment().format('DD-MM-YYYY HH:mm:ss A');
    // const nickname = users[data.nickname];
    const message = `${timestamp} - ${nickname}: ${chatMessage}`;

    await webChatModel.createMessage({ chatMessage, nickname });
    io.emit('message', message);
  });
  
  socket.on('disconnect', () => {
    console.log(`usuário ${socket.id} desconectado!`);
    delete users[socket.id];
  });

  io.emit('nickname', Object.values(users));
});

app.get('/', async (_req, res) => {
  const messages = await webChatModel.getAllMessages();
  res.render('chat', { messages });
});

const PORT = process.env.PORT || 3000;

serverHttp.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));