const express = require('express');
const cors = require('cors');
const path = require('path');
const moment = require('moment');

const app = express();
const port = 3000;
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const allUsers = [];

io.on('connection', (socket) => {
  allUsers.push(socket.id.substring(0, 16));
  io.emit('newUser', allUsers);
  socket.on('message', ({ chatMessage, nickname }) => {
    const timeStamp = moment().format('DD-MM-YYYY HH:mm:ss A');
    console.log(`${timeStamp} - ${nickname}: ${chatMessage}`);
    io.emit('message', `${timeStamp} - ${nickname}: ${chatMessage}`);
  });
  socket.on('disconnect', () => {
    allUsers.pop();
    io.emit('newUser', allUsers);
  });
});

app.use(cors());
app.use(express.static(`${__dirname}/public/`));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', (req, res) => {
  res.render('index.ejs');
});

server.listen(port, () => console.log(`BORA QUE AGORA TA RODANDO NA PORTA ${port}`));