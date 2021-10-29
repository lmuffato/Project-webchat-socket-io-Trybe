const express = require('express');
const moment = require('moment');

const app = express();
const http = require('http').createServer(app);

moment.locale();

const port = 3000;

app.set('view engine', 'ejs');

app.set('views', './views');

app.use(express.static(`${__dirname}/public`));

const clients = [];

const idFormater = (id) => id.slice(0, 16);

const io = require('socket.io')(http, {
  cors: {
    origi: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const messageController = require('./controller/messageController');

const createMessage = (chatMessage, nickname, id) => {
  const date = moment().format('DD-MM-YYYY hh:mm:ss A');
  const formatedId = idFormater(nickname);
  messageController.insertMessage(id, chatMessage, formatedId, date);
  return `${date} - ${formatedId}: ${chatMessage}`;
};

const nicknameUpdater = (id, nickname) => {
  const clientIndex = clients.findIndex((c) => c.id === id);

  clients.splice(clientIndex, 1);
  clients.push({ id, nickname });

  messageController.updateNickname(id, nickname);
};

const clientsManage = async (id) => {
  const client = { id, nickname: '' };
  clients.push(client);
};

const clientsDelete = async (id) => {
  const removeClient = clients.findIndex((c) => c.id === id);
  clients.splice(removeClient, 1);
};

io.on('connection', (socket) => {
  // socket.disconnect(0);
  const id = idFormater(socket.id);
  clientsManage(id);
  
  socket.emit('currentUserId', id);

  io.emit('usersList', clients);

  socket.on('message', ({ chatMessage, nickname }) => {
    const message = createMessage(chatMessage, nickname, id);

    io.emit('message', message);
  });

  socket.on('nickname', ({ nickname }) => {
    nicknameUpdater(id, nickname);

    io.emit('nickname', { id, nickname });
  });

  socket.on('disconnect', () => {
    clientsDelete(id);

    io.emit('removeUser', id);
  });
});

app.get('/', async (_req, res) => {
  const messages = await messageController.findAll();
  res.render('index', { clients, messages });
});

http.listen(port, () => console.log('Ouvindo na porta 3000'));
