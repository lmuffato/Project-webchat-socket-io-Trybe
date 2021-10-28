const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const path = require('path');

const app = express();

const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

const chatController = require('./src/controllers/chat');

app.use(cors());

app.use(express.static(path.join(__dirname, '/src/views')));

app.use(bodyParser.urlencoded({ extended: true }));

require('./src/sockets/userChat')(io);

app.set('view engine', 'ejs');

app.set('views', './src/views');

app.get('/', chatController);

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});