const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const http = require('http').createServer(app);

const port = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const chatController = require('./controllers/chatController');

app.use(cors());

app.set('views', './views');
app.set('view engine', 'ejs');

require('./sockets/chatSocket')(io);

app.get('/', chatController.renderChat);

http.listen(port, () => console.log(`Ouvindo na porta ${port}!`));