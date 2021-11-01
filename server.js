const express = require('express');
const cors = require('cors');
const moment = require('moment');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'https://localhost:3000',
    method: ['GET, POST'],
  },
});

const Users = [];

io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const timeStamp = moment().format('DD-MM-YYYY HH:mm:ss A');
    io.emit('message', `${timeStamp} - ${nickname}: ${chatMessage}`);
    console.log(`${timeStamp} - ${nickname}: ${chatMessage}`);
  });
  Users.push(socket.id.substring(0, 16));
  io.emit('showUsers', Users);

  socket.on('disconnect', () => {
    Users.pop();
    io.emit('show_Users', Users);
  });
});

app.use(cors());
app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use('/', (req, res) => {
  res.render('index.ejs');
});

http.listen(PORT, () => console.log(`Passando na porta ${PORT}`));