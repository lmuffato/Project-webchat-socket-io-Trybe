const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;
const socketIoServer = require('http').createServer(app);

const io = require('socket.io')(socketIoServer, {
  cors: {
    origin: `http://localhost:${port}`,
    methods: ['GET', 'POST'],
  },
});

const { random } = require('lodash');
const MessageController = require('./controllers/message');

const getCurrentDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = (date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth());
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = (date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes());
  const seconds = (date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds());
  const periods = date
  .toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).substr(-2);
  return `${day}-${month}-${year} ${hour}:${minutes}:${seconds} ${periods}`;
};

app.use(cors());
app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'ejs');
app.set('views', './public/views');

app.get('/', (req, res) => {
  res.render('webchat');
});

// socket back-end
io.on('connection', async (socket) => {
  console.log(`Conectou ==> ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Desconectou ==> ${socket.id}`);
  });

  const randomNicknam = socket.id.substr(0, 16);

  io.emit('nickname', randomNicknam);

  socket.on('message', async (message) => {
    const { nickname, chatMessage } = message;
    const timestamp = getCurrentDate();
    const newMessage = `${timestamp} - ${nickname}: ${chatMessage}`;
    await MessageController.create({ ...message, timestamp });
    io.emit('message', newMessage);
    console.log('Ouvindo message do back-end ==>', message);
  });

  const getAllMessages = await MessageController.getAll();
  console.log('Ouvindo messageList do back-end ==>', getAllMessages);
  socket.emit('messageList', getAllMessages);
});

socketIoServer.listen(port, console.log(`App rodando na porta ${port}`));
