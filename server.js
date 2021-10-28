const express = require('express');
const path = require('path');

const app = express();

const server = require('http').createServer(app);

const { Server } = require('socket.io');

const io = new Server(server);

const PORT = 3000;

app.use(express.static('./public'));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public/chat.html'));
});

io.on('connection', () => {
  console.log('Usuário conectado');
});

server.listen(PORT, () => console.log(`Server WebChat Online na porta ${PORT}`)); 