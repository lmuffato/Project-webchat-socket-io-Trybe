const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socket = require('socket.io');

const app = express();
const PORT = 3000;

const server = http.createServer(app);

const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const chatController = require('./src/controller/chatController');

require('./src/socket/chatSocket')(io);

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.set('views', './public/views');

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.get('/', chatController.getAll);

server.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`));