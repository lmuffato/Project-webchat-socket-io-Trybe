require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const { Server } = require('socket.io');
const webChatModel = require('./models/WebChat');
const sendMessage = require('./utils/sendMessage');

const app = express();

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
  console.log(`Client ${socket.id} connected`);
  users[socket.id] = socket.id.slice(0, 16);
  
  socket.on('nickname', (nickname) => {
    users[socket.id] = nickname;

    socket.emit('nickname', users[socket.id]);
    console.log(users[socket.id]);
    io.emit('listUsers', Object.values(users));
  });

  socket.on('message', async ({ nickname, chatMessage, socketId = '' }) => {
    await sendMessage({ socketId, nickname, chatMessage, io, users });
  });

  socket.on('disconnect', () => {
    delete users[socket.id];
    console.log(`Client ${socket.id} disconnected`);
    io.emit('listUsers', Object.values(users));
  });

  socket.emit('nickname', users[socket.id]);
  io.emit('listUsers', Object.values(users));
});

app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', async (_req, res) => {
  const messages = await webChatModel.getAllMessages();
  res.render('chat', { messages });
});

const PORT = process.env.PORT || 3000;

serverHttp.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));