require('dotenv').config();

const { Server } = require('socket.io');
const express = require('express');
const moment = require('moment');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

// ------------------------------------------------------------------------------------------//

const timestamp = moment().format('DD-MM-YYYY hh:mm:ss');
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const io = new Server(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// para novo usuário
const users = {};

// conecta o front, o server e o socket
io.on('connection', (socket) => { 
  users[socket.id] = socket.id.slice(0, 16);
  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit('message', `${timestamp} - ${nickname} : ${chatMessage}`);
  });
  socket.on('newUser', (nickname) => {
    users[socket.id] = nickname;
    io.emit('allUsers', Object.values(users));
  });
  io.emit('allUsers', Object.values(users));
});

app.get('/', (_req, res) => res.render('chat/index'));

// ------------------------------------------------------------------------------------------//

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log(`Socket online na ${PORT}, acessar: http://localhost:3000`);
});

// http: cria o servidor, poder usar na mesma porta o back e o front
// createServer(app): conecta o client e o servidor para trabalharem juntos
// cors: conexão e método