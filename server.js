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

const controller = require('./controller/messageController');

// const createMessage = (chatMessage, nickname) => {
//   const data = moment().format('DD-MM-YYYY hh:mm:ss A');
//   return `${data} - ${nickname}: ${chatMessage}`;
// };

io.on('connection', (socket) => {
  const id = idFormater(socket.id);
  const client = { id, nickname: '' };
  io.emit('user', id);

  clients.push(client);

  socket.on('message', ({ chatMessage, nickname }) => {
    const formatedId = idFormater(nickname);
    // const message = createMessage(chatMessage, formatedId);
    const date = moment().format('DD-MM-YYYY hh:mm:ss A');
    const message = `${date} - ${formatedId}: ${chatMessage}`;

    io.emit('message', message);

    controller.insertMessage(id, chatMessage, formatedId, date);
  });

  socket.on('nickname', ({ nickname }) => {
    const clientIndex = clients.findIndex((c) => c.id === id);

    clients.splice(clientIndex, 1);
    clients.push({ id, nickname });

    io.emit('nickname', { id, nickname });

    controller.updateNickname(id, nickname);
  });
});

app.get('/', async (_req, res) => {
  const messages = await controller.findAll();
  res.render('index', { clients, messages });
});

http.listen(port, () => console.log('Ouvindo na porta 3000'));
