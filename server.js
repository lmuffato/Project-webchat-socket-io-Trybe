const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const chatController = require('./controllers/chatController.js');

require('./sockets/chatSocket')(io);

app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');
app.set('views', './public/views');

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

app.get('/', chatController.getAllMsg);

server.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));