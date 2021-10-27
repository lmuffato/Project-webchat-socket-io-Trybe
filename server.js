// Faça seu código aqui
require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http').createServer(app);

const bodyParser = require('body-parser');

const PORT = process.env.PORT;

app.use(bodyParser.json());

const dateInteger = new Date;
const formatedDate = `${dateInteger.getDay()}-${dateInteger.getMonth()}-${dateInteger.getFullYear()}`
const formatedHours = `${dateInteger.getHours()}:${dateInteger.getMinutes()}:${dateInteger.getSeconds()}`

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }});

io.on('connection', (socket) => {
  socket.emit('wellcome', () => {
    console.log(`Usuário ${socket.id} seja bem-vindo`)
  })

  socket.on('message', ({ chatMessage, nickname}) => {
    console.log(`${formatedDate} ${formatedHours} - ${nickname}: ${chatMessage}`)
    io.emit('message', `${formatedDate} ${formatedHours} - ${nickname}: ${chatMessage}`)
  })
});

http.listen(PORT, () => {
  console.log(`Socket conectado na porta ${PORT}`);
});