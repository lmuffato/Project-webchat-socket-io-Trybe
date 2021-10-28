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

const registerUser = (soc, data, initialId) => {
  if (!data) {
    usuarios.push({ userName: initialId, clientId: soc.id });
    soc.emit('usuarios', usuarios);
    soc.broadcast.emit('newUser', { userName: initialId, clientId: soc.id });
  } else {
    soc.emit('usuarios', usuarios);
  }
};

const messageGen = (data) => {
  const { chatMessage, nickname } = data;
  const now = new Date();
  const dateStringWithTime = moment(now).format('DD-MM-yyyy HH:mm:ss A');
  const newMessage = `${dateStringWithTime} - ${nickname}: ${chatMessage}`;
  Model.insertMessage({ timestamp: dateStringWithTime, nickname, message: chatMessage });
  return newMessage;
};

io.on('connection', (socket) => {
  socket.emit('connection', socket.id.substring(0, 16));
  socket.on('registeredUser', ({ data }) => {
    registerUser(socket, data, socket.id.substring(0, 16));
  });
  socket.on('changeName', (data) => {
    const index = usuarios.findIndex((user) => user.userName === data.oldName);
    usuarios[index] = { userName: data.newName, clientId: usuarios[index].clientId };
    io.emit('changeName', data);
  });
  socket.on('message', (data) => {
    const newMessage = messageGen(data);
    io.emit('message', newMessage);
  });
  socket.on('disconnect', () => {
    io.emit('disconnected', socket.id);
    const myIndex = usuarios.findIndex((user) => user.clientId === socket.id);
    usuarios.splice(myIndex, 1);
  });
});

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', Controller.getAllMessages);

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
