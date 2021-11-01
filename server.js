// Faça seu código aqui
const express = require('express');
const path = require('path');

const app = express();

const http = require('http').createServer(app);

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

require('./sockets/chat')(io);

app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');

app.set('views', './views');

const { messagesController } = require('./controllers/messagesController');

app.get('/', messagesController);
