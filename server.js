const express = require('express');
const moment = require('moment');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const http = require('http').createServer(app);

const PORT = 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

const Controller = require('./controllers/ChatController');
const Model = require('./models/ChatModel');

const usuarios = [];
io.on('connection', (socket) => {
  const initialId = socket.id.substring(0, 16);
  socket.emit('connection', initialId);
  usuarios.push(initialId);
  io.emit('usuarios', usuarios);
  socket.on('message', (data) => {
    const { chatMessage, nickname } = data;
    const now = new Date();
    const dateStringWithTime = moment(now).format('DD-MM-yyyy HH:mm:ss A');
    const newMessage = `${dateStringWithTime} - ${nickname}: ${chatMessage}`;
    Model.insertMessage({ timestamp: dateStringWithTime, nickname, message: chatMessage });
    io.emit('message', newMessage);
  });
});

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', Controller.getAllMessages);

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
