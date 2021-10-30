// Consegui fazer o Req1 durante uma chamada na sala 2 no dia 30/10/2021 com:
// Rafael Medeiros, Lucas Lara, Vini e Adelino Junior e Murilo Gonçalves.

const express = require('express');
const moment = require('moment');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: { origin: `http://localhost:${PORT}`, methods: ['GET', 'POST'] },
});

app.set('view engine', 'ejs');
app.set('views', './views');

io.on('connection', (socket) => {
  console.log(`Usuário: ${socket.id} conectado!`);
  socket.on('message', ({ chatMessage, nickname }) => {
    const newData = moment().format('DD-MM-yyyy HH:mm:ss');
    io.emit('message', `${newData} ${nickname}: ${chatMessage}`);
  });
});

app.get('/', (req, res) => {
  res.render('index');
});

http.listen(3000, () => {
  console.log(`Servidor funcionando na porta ${PORT}`);
});