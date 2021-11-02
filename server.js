require('dotenv').config();

const { Server } = require('socket.io');
const express = require('express');
const moment = require('moment');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

// ------------------------------------------------------------------------------------------//

const timestamp = moment().format('DD-MM-YYYY hh:mm:ss');

const io = new Server(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => { 
  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit('message', `${timestamp} - ${nickname} : ${chatMessage}`);
  });
});

app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (_req, res) => res.render('chat/index'));

// ------------------------------------------------------------------------------------------//

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log(`Socket online na ${PORT}, acessar: http://localhost:3000`);
});

// http: cria o servidor
// createServer(app): conecta o client e o servidor para trabalharem juntos
// cors: conexão e métodos
