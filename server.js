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
 const histController = require('./controller/histController');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'chat')));

app.get('/', (req, res) => {
  res.render('chat');
});

io.on('connection', (socket) => {
  console.log('ihhh foi conectado');
  socket.emit('onlineUser', socket.id.slice(0, 16));
  socket.on('message', ({ chatMessage, nickname }) => {
    const timeNow = moment().format('DD-MM-YYYY hh:mm:ss');
    io.emit('message', `${timeNow} - ${nickname} - ${chatMessage}`);
  });
});

app.get('/hist', histController.getAll);

http.listen(port, () => console.log(`Example app listening on ${port}!`));