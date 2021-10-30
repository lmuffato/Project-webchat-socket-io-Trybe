const express = require('express');

const app = express();

const server = require('http').createServer(app);

const { Server } = require('socket.io');

const io = new Server(server);

const PORT = 3000;

app.use(express.static('./public'));

require('./sockets')(io);

server.listen(PORT, () =>
  console.log(`Server WebChat Online na porta ${PORT}`));
