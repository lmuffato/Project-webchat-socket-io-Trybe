const express = require('express');

const app = express();

const server = require('http').createServer(app);

const { Server } = require('socket.io');

const io = new Server(server);

setInterval(async () => {
  console.log(await io.allSockets());
}, 1000);

const PORT = 3000;

app.use(express.static('./public'));

require('./sockets')(io);

server.listen(PORT, () =>
  console.log(`Server WebChat Online na porta ${PORT}`));
