// Back-end server
const express = require('express'); // ok
const bodyParser = require('body-parser'); // ok
const path = require('path');

require('dotenv').config();

const app = express(); // ok

const socketIoServer = require('http').createServer(app);
const io = require('socket.io')(socketIoServer, {
  cors: { // Aqui existe um objeto de configuração, essas options são necessárias a partir da major 3 do socket.io 
    origin: `http://localhost:${process.env.PORT}`, // origem permitida
    methods: ['GET', 'POST'], // métodos permitidos
  },
});

const NEW_NOTIFICATION = [];

io.on('connection', (socket) => {
  socket.emit('chat', NEW_NOTIFICATION); // envia para todos sem repetir p quem já ta on (qndo entra alguem novo)
  console.log(`novo usuário ${socket.id}  conectado ao socket.io`);
});

app.set('view engine', 'ejs');
app.set('views', './public/views');

app.use(bodyParser.json()); // ok
app.use(bodyParser.urlencoded({ extended: true })); // ok

app.use(express.static(path.join(__dirname, 'public', 'assets', 'javascript'))); 
// app.use('/assets', express.static('.public/assets/css'));

app.get('/chat', (req, res) => {
  res.render('chat', { notifications: NEW_NOTIFICATION });
});

app.post('/message', (req, res) => { // ok
  const { notification } = req.body;

  NEW_NOTIFICATION.push(notification); // Criar um db para salvar as mensagens

  io.emit('message', notification);

  res.status(201).json({ message: 'Notified successfully' });
});

socketIoServer.listen(
  process.env.PORT, 
  console.log(`Socket.io server listening on port ${process.env.PORT}!`),
  ); // ok