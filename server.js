require('dotenv/config');

const express = require('express');
const moment = require('moment');

const app = express();
const http = require('http').createServer(app);

const PORT = 3000;
const options = {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
};

const getNick = (nickCode) => nickCode.slice(0, 16);

const io = require('socket.io')(http, options);

const messagesController = require('./controllers/MessagesController');

const onlineClients = [];

app.set('view engine', 'ejs');

app.set('views', './views');

app.use(express.static(`${__dirname}/public`));

io.on('connection', (socket) => {
  const nick = getNick(socket.id);
  const currentClient = { id: getNick(socket.id), nickname: '' };

  socket.emit('user', nick);

  onlineClients.push(currentClient);

  socket.on('message', ({ chatMessage, nickname }) => {
    const currentNickname = getNick(nickname);
    const timeStamp = moment(Date.now()).format('DD-MM-yyyy HH:mm:ss');
    const fullMessage = `${timeStamp} - ${currentNickname}: ${chatMessage}`;
    io.emit('message', fullMessage);

    messagesController.createMessage(socket.id, fullMessage, currentNickname, timeStamp);
  });

  socket.on('nickname', (data) => {
    const clientPosition = onlineClients.findIndex((client) => client.id === nick);
    // Fonte: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/splice (sim, até hoje kkk)
    onlineClients.splice(clientPosition, 1);

    onlineClients.push({ id: nick, nickname: data.nickname });
    io.emit('nickname', { id: nick, nickname: data.nickname });  
  });
});

app.get('/', async (_req, res) => {
  const messages = await messagesController.getAllMessages();
  res.render('index', { onlineClients, messages });
});

http.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});
