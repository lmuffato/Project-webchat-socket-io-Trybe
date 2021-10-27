const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('webchat', (newMessage) => {
    io.emit('webchat', newMessage);
  });
  console.log(`ID: ${socket.id} entrou!`);
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.render('chat');
});

http.listen(PORT, () => console.log(`API escutando na porta ${PORT}`));
