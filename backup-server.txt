const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const server = require('http').createServer(app);

const PORT = 3000;

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

require('./sockets/chat.js')(io);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));