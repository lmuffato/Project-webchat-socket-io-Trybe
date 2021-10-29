const express = require('express');
const path = require('path');
const moment = require('moment');
// const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(cors());
const http = require('http').createServer(app);

const corsOptions = {
  origin: `http://localhost:${PORT}`,
  methods: ['GET', 'POST'],
};
// io
const io = require('socket.io')(http, corsOptions);

app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'views')));
app.set('views', path.join(__dirname, 'views'));

io.on('connection', (socket) => {
  console.log(`Usuário conectado: ${socket.id}`);

  socket.on('message', ({ nickname, chatMessage }) => {
    const timeStamp = moment().format('DD-MM-YYYY HH:mm');
    io.emit('message', `${timeStamp} - ${nickname}: ${chatMessage}`);
  });
});

app.use('/', (_req, res) => {
  res.render('index.ejs');
});

http.listen(PORT, () => console.log(`Socket online na ${PORT}
Acessar: http://localhost:${PORT}`));