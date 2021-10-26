const express = require('express');
const path = require('path');
const cors = require('cors');
const moment = require('moment');
require('dotenv').config();

const Model = require('./models/message.js');

const PORT = process.env.PORT || 3000;

const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

const allUsers = {};

io.on('connection', (socket) => {
  allUsers[socket.id] = socket.id.substring(0, 16);
  io.emit('allUsers', Object.values(allUsers));

  socket.on('nicknameChange', (data) => {
    allUsers[socket.id] = data;
    io.emit('allUsers', Object.values(allUsers));
  });

  socket.on('message', async ({ nickname, chatMessage }) => {
    const timestamp = moment().format('DD-MM-yyyy HH:mm:ss A');
    await Model.create({ message: chatMessage, nickname, timestamp });
    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
  });

  socket.on('disconnect', () => {
    delete allUsers[socket.id];
    io.emit('allUsers', Object.values(allUsers));
  });
});

app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', './views');
app.set('view engine', 'ejs');

// Render WebChat
app.get('/', (_req, res) => {
  res.render('index');
});

server.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});