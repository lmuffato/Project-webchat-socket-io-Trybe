const express = require('express');
const cors = require('cors');
const moment = require('moment');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'https://localhost:3000',
    method: ['GET, POST'],
  },
});

const chatModel = require('./models/chatModel');

const Users = {};

const formatMessage = (timeStamp, nickname, chatMessage) =>
  `${timeStamp} - ${nickname}: ${chatMessage}`;

/* const renderUsers = (socket) => {
  io.emit('showUsers', Object.values(Users));
}; */

const saveMessages = (socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const timeStamp = moment().format('DD-MM-YYYY HH:mm:ss A');
    await chatModel.saveMessage({ timeStamp, chatMessage, nickname });
    io.emit('message', formatMessage(timeStamp, nickname, chatMessage));
  });
};

io.on('connection', async (socket) => {
  Users[socket.id] = socket.id.substring(0, 16);
  /* renderUsers(socket); */
  saveMessages(socket);
  socket.emit('sendSocketID', socket.id);
  io.emit('showUsers', Users);

  const getAllMessages = await chatModel.readAllMessages();
  getAllMessages.map(({ timeStamp, nickname, chatMessage }) =>
    formatMessage(timeStamp, nickname, chatMessage));

  socket.emit('getMessages', getAllMessages);

  socket.on('nickname', (nickname) => {
    Users[socket.id] = nickname;
    io.emit('showUsers', Users);
  });
  socket.on('disconnect', () => {
    delete Users[socket.id];
    io.emit('showUsers', Users);
  });
});

app.use(cors());
app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use('/', (_req, res) => {
  res.render('index.ejs');
});

app.get('/', (_req, res) => { res.render('webChat'); });

http.listen(PORT, () => console.log(`Passando na porta ${PORT}`));