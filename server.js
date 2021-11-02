const express = require('express');
const cors = require('cors');
const path = require('path');
const moment = require('moment');

const app = express();
const port = 3000;
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const {
  saveMessages,
  getAllMessages,
} = require('./models/chatModel');

const allUsers = {};

const formatMessage = (timeStamp, nickname, chatMessage) => 
  `${timeStamp} - ${nickname}: ${chatMessage}`;

const saveMessage = (socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const timeStamp = moment().format('DD-MM-YYYY HH:mm:ss A');
    await saveMessages({ chatMessage, nickname, timeStamp });
    io.emit('message', formatMessage(timeStamp, nickname, chatMessage));
  });
};

io.on('connection', async (socket) => {
  allUsers[socket.id] = socket.id.substring(0, 16);
  saveMessage(socket);

  socket.emit('sendSocketID', socket.id);

  io.emit('newUser', allUsers);

  const getMessages = await getAllMessages();
  getMessages.map(({ chatMessage, nickname, timeStamp }) => formatMessage({ 
    timeStamp, nickname, chatMessage,
  }));

  socket.emit('getMessages', getMessages);

  socket.on('nickname', (nickname) => {
    allUsers[socket.id] = nickname;
    io.emit('newUser', allUsers);
  });
  socket.on('disconnect', () => {
    delete allUsers[socket.id];
    io.emit('newUser', allUsers);
  });
});

app.use(cors());
app.use(express.static(`${__dirname}/public/`));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', (req, res) => {
  res.render('index.ejs');
});

server.listen(port, () => console.log(`BORA QUE AGORA TA RODANDO NA PORTA ${port}`));