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
  console.log(`ID: ${socket.id} entrou!`);
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/webchat', (_req, res) => {
  res.render('chat');
});

app.post('/webchat', (req, res) => {
  const { newMessage } = req.body;
  console.log(newMessage)
  io.emit('webchat', newMessage);
  res.status(201).json({ message: 'Success' });
});

http.listen(PORT, () => console.log(`API escutando na porta ${PORT}`));
