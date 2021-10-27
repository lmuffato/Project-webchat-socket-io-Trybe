const express = require('express');

const app = express();
const server = require('http').createServer(app);
require('dotenv').config();
const cors = require('cors');
const moment = require('moment');

app.set('view engine', 'ejs');
app.set('views', './views');

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(server, {
  cros: {
    origin: `http//localhost:${PORT}`,
    mthods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`Feita a conexão! Novo usuário conectado ${socket.id}`);

  socket.on('nickname', (nick) => {
    io.emit('serverNickname', { nickname: nick });
  });

  socket.on('message', ({ nickname, chatMessage }) => {
    const timestamp = moment().format('DD-MM-yyyy HH:mm:ss A');
    console.log(timestamp, nickname, chatMessage);
    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
  });
});

app.use(cors());

app.get('/', (req, res) => {
    res.render('client');
});

// app.post('/', (req, res) => {

// });

server.listen(PORT, console.log(`Ouvindo Socket.io server na porta ${PORT}`));
