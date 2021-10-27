const express = require('express');
const cors = require('cors');
const moment = require('moment');

const app = express();
const PORT = 3000;
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const allUsers = {};
const chatModel = require('./models/chat');

function formatMessage(timeStamp, nickname, chatMessage) {
  return `${timeStamp} - ${nickname}: ${chatMessage}`;
}

io.on('connection', async (socket) => {
  allUsers[socket.id] = socket.id.substring(0, 16);

  io.emit('newUser', Object.values(allUsers));

  const allMessages = await chatModel.getAllMessages();
  allMessages.map(({ timeStamp, nickname, chatMessage }) =>
    formatMessage({ timeStamp, nickname, chatMessage }));

  socket.emit('getMessages', allMessages);

  socket.on('message', async ({ chatMessage, nickname }) => {
    const timeStamp = moment().format('DD-MM-YYYY HH:mm:ss A');
    await chatModel.saveMessage({ chatMessage, nickname, timeStamp });
    io.emit('message', formatMessage(timeStamp, nickname, chatMessage));
  });

  socket.on('disconnect', () => {
    delete allUsers[socket.id];
    io.emit('newUser', Object.values(allUsers));
  });
});

app.use(cors());

app.use('/', express.static('./views'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('webchat');
});

server.listen(PORT, () => console.log('Partiu'));
