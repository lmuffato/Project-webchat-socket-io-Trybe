const express = require('express');
const path = require('path');
const cors = require('cors');
const http = require('http');
require('dotenv').config();

// criando serviço
const app = express();
const server = http.createServer(app);

// criando io
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

// call sockets
require('./sockets/webchat')(io);

// usando middle
app.use(express.static(path.join(__dirname, '/public')));
app.use(cors());

// declarando rota
app.get('/', (_req, res) => res.sendFile(path.join(__dirname, '/index.html')));

// criando conexão
const { env: { PORT } } = process;
const myPort = PORT || 3000;
server.listen(myPort, () => {
  console.log(`ouvindo na porta ${myPort}`);
});
