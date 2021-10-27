const express = require('express');
const path = require('path');

const app = express();

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.set('view engine', 'ejs');

app.set('views', './views');

app.use('/js', express.static(path.join(__dirname, 'public', 'js')));

const chatController = require('./controllers/chat');

chatController.socketConnection(io);

app.get('/', chatController.chat);

server.listen(3000, console.log('Listening to port 3000'));
