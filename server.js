const express = require('express');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

require('./sockets/chatSocket')(io);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(`${__dirname}/public`));

app.get('/', (_req, res) => {
  res.render('chatView', {
    messages: ['teste1', 'teste2'], nickName: 'nick', users: ['usr1', 'usr2'],
  });
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
