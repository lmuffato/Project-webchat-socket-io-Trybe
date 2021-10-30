require('dotenv').config();
const moment = require('moment');

const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

// app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const { Server } = require('socket.io');

const { getAllChatMessages, saveMessage } = require('./models/chat');
// const socketIo = require('socket.io'); 
const io = new Server(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const timestamp = moment().format('DD-MM-YYYY hh:mm:ss');

const users = {};
io.on('connection', async (socket) => { 
  // console.log(`O CLiente ${socket.id} está online`);
  users[socket.id] = socket.id.slice(0, 16);
  
  socket.on('message', async ({ chatMessage, nickname }) => {
    io.emit('message', `${timestamp} - ${nickname} : ${chatMessage}`);
    await saveMessage({ timestamp, nickname, chatMessage });
  });

  socket.on('newNickname', (nickname) => {
    users[socket.id] = nickname;
    // console.log(users);
    io.emit('usersList', Object.values(users));
  });

  io.emit('usersList', Object.values(users));

  const historyMsg = async () => {
    const messagesFromDB = await getAllChatMessages();
    return messagesFromDB;
  };

  io.emit('historyMsg', await historyMsg());
});

app.get('/', (_req, res) => res.render('chat/index'));

http.listen(PORT, () => {
  console.log(`Socket online na ${PORT}, acessar: http://localhost:3000`);
});

// Requisito 2 foi realizado com ajuda de Anderson Nasimento turma 10 A