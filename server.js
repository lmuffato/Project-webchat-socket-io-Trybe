const express = require('express');
const path = require('path');
const cors = require('cors');

const EXPRESS_PORT = 3000;
const SOCKETIO_PORT = 5000;

const app = express();
const socketIoServer = require('http').createServer();

const io = require('socket.io')(socketIoServer, {
  cors: { 
    origin: `http://localhost:${EXPRESS_PORT}`, 
    methods: ['GET', 'POST'], 
  },
});

app.use(
  cors({
    origin: `http://localhost:${EXPRESS_PORT}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization'],
  }),
);

app.use(express.static(path.join(__dirname, '/views')));

require('./sockets/webchat')(io);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/webchat.html'));
});

app.listen(EXPRESS_PORT, () => {
  console.log(`Express app listening on port ${EXPRESS_PORT}`);
});

socketIoServer.listen(SOCKETIO_PORT, () => {
  console.log(`Socket.io server listening on port ${SOCKETIO_PORT}`);
});
