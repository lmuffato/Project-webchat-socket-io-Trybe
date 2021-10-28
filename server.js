const express = require('express');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'], 
  } });

const chatControllers = require('./controllers/chat');

  app.use(cors());

// io.on('connection', (socket) => {
//   console.log(`Usuário conectado. ID: ${socket.id} `);
// });

app.set('view engine', 'ejs');

app.set('views', './views');

require('./sockets/chat')(io);

app.get('/', chatControllers.getAllMessages);

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
