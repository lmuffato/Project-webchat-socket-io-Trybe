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

const createMessage = (chatMessage, nickname) => {
  const data = moment().format('DD-MM-YYYY hh:mm:ss A');
  return `${data} - ${nickname}: ${chatMessage}`;
};

io.on('connection', (socket) => {
  const id = idFormater(socket.id);
  const client = { id, nickname: '' };
  io.emit('user', id);

  clients.push(client);
  socket.on('message', ({ chatMessage, nickname }) => {
    const idFormated = idFormater(nickname);
    const message = createMessage(chatMessage, idFormated);

    io.emit('message', message);
  });

  socket.on('nickname', ({ nickname, id: clientId }) => {
    const idFormated = idFormater(clientId);
    const clientIndex = clients.findIndex((c) => c.id === idFormated);

    clients.splice(clientIndex, 1);

    clients.push({ id: idFormated, nickname });
    io.emit('nickname', { id: idFormated, nickname });
  });
});

app.get('/', (req, res) => res.render('index', { clients }));

http.listen(port, () => console.log('Ouvindo na porta 3000'));