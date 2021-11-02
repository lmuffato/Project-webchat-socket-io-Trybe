require('dotenv/config');

const express = require('express');
const moment = require('moment');

// const middlewares = require('./middlewares');

const app = express();
const http = require('http').createServer(app);

const onlineClients = [];

const PORT = 3000;

app.set('view engine', 'ejs');

app.set('views', './views');

app.use(express.static(`${__dirname}/public`));

const options = {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
};

const io = require('socket.io')(http, options);

const getNick = (nickCode) => nickCode.slice(0, 16);

io.on('connection', (socket) => {
  const nick = getNick(socket.id);
  const currentClient = { id: nick, nickname: '' };

  socket.emit('user', nick);

  onlineClients.push(currentClient);

  socket.on('message', ({ chatMessage, nickname }) => {
    const currentNickname = getNick(nickname);
    const timeStamp = moment(Date.now()).format('DD-MM-yyyy HH:mm:ss');
    io.emit('message', `${timeStamp} - ${currentNickname}: ${chatMessage}`);
  });

  socket.on('nickname', (data) => {
    console.log({ data });

    const nickname = getNick(data.id);

    const clientPosition = onlineClients.findIndex((client) => client.id === nickname);
    // Fonte: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/splice (sim, até hoje kkk)
    onlineClients.splice(clientPosition, 1);

    onlineClients.push({ id: nick, nickname: data.nickname });
    io.emit('nickname', { id: nick, nickname: data.nickname });  
  });
});

// app.get('/', (req, res) => res.render('index'));
app.get('/', (req, res) => res.render('index', { onlineClients }));
// app.use(middlewares.error);

http.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});
