const express = require('express');
const cors = require('cors');
const moment = require('moment');

const app = express();
const PORT = 3000;
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const timeStamp = moment().format('DD-MM-YYYY HH:mm:ss A');
    io.emit('message', `${timeStamp} - ${nickname}: ${chatMessage}`);
  });
});

app.use(cors());

app.use('/', express.static('./views'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('webchat');
});

server.listen(PORT, () => console.log('Partiu'));
