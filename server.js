const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const chatController = require('./controllers/chatController');
const chatSocket = require('./sockets/chatSocket');

chatSocket(io);

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.set('view engine', 'ejs');

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', chatController.renderPage);

server.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
