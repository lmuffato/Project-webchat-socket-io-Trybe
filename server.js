const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const webchatSocket = require('./socket/webchat');

const app = express();
const server = http.createServer(app);
const socket = new Server(server);

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('./index');
});

socket.on('connection', (io) => {
  console.log('a user connected');
  webchatSocket(io);
});

server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
