const express = require('express');

const app = express();
const server = require('http').createServer(app);
require('dotenv').config();

app.set('view engine', 'ejs');
app.set('views', './views');

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.render('client');
});

const io = require('socket.io')(server, {
  cros: {
    origin: `http//localhost:${PORT}`,
    mthods: ['GET', 'POST'],
  },
});

io.on('connection', () => {
  console.log('Feita a conexão! Novo usuário conectado.');
});

server.listen(PORT, console.log(`Ouvindo Socket.io server na porta ${PORT}`));
