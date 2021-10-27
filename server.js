const express = require('express');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
const Chat = require('./models/chatModels');

const { handleSocket } = require('./sockets/chatSocket');

handleSocket(io);

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', async (_req, res) => {
  const history = await Chat.getMsg();
  res.render('chatView', { history });
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
