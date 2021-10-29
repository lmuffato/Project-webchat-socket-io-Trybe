const express = require('express');
const path = require('path');
const moment = require('moment');
// https://momentjs.com/

const app = express();
const port = 3000;
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.status(200).render('chat');
});

const timeNow = moment().format('DD-MM-YYYY hh:mm:ss');
io.on('connection', (socket) => {
  console.log('ihhh foi conectado');
  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit('message', `${timeNow} - ${nickname} - ${chatMessage}`);
  });
});

app.use(express.static(path.join(__dirname, 'chat')));

http.listen(port, () => console.log(`Example app listening on ${port}!`));