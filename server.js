const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const APP_PORT = process.env.PORT || 3000;
const SOCKET_PORT = process.env.PORT || 3001;

app.get('/', (req, res) => res.send('Hello World'));

io.on('connection', () => {
  console.log('a user connected');
});

app.listen(APP_PORT, () => {
  console.log(`App is running at port ${APP_PORT}`);
});

server.listen(SOCKET_PORT, () => {
  console.log(`Server is running at port ${SOCKET_PORT}`);
});
