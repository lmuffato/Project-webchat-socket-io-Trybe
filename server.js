const express = require('express');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
require('./chat')(io);

app.set('view engine', 'ejs');

app.set('views', './views');

app.get('/', (_req, res) => res.status(200).render('index'));

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
