const express = require('express');

const app = express();
const server = require('http').createServer(app);
require('dotenv').config();
const cors = require('cors');

app.set('view engine', 'ejs');
app.set('views', './views');

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(server, {
  cros: {
    origin: `http//localhost:${PORT}`,
    mthods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`Feita a conexão! Novo usuário conectado ${socket.id}`);

  socket.on('message', (msg) => {
    console.log(msg);
  });
});

app.use(cors());

app.get('/', (req, res) => {
    res.render('client');
});

// app.post('/', (req, res) => {

// });

server.listen(PORT, console.log(`Ouvindo Socket.io server na porta ${PORT}`));
