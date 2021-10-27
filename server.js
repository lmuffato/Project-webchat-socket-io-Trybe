// Faça seu código aqui
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const PORT = 3000;

const socketIoServer = require('http').createServer(app);
const io = require('socket.io')(socketIoServer, {
  cors: { 
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

const NEWS = [];

io.on('connection', (socket) => {
  socket.emit('loadNotifications', NEWS);
  console.log(`novo usuário ${socket.id}  conectado ao socket.io`);
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/assets', express.static('./assets/javascripts'));
// app.use('/assets', express.static('./assets/css'));

app.get('/', (req, res) => res.render('home', { notifications: NEWS }));

// app.get('/board/csr', (req, res) => res.render('board/csr'));

app.post('/notify', (req, res) => {
  const { notification } = req.body;

  NEWS.push(notification);

  io.emit('notification', notification);

  res.status(201).json({ message: 'Notificado com sucesso' });
});

socketIoServer.listen(PORT, console.log(`Socket.io server listening on port ${PORT}!`));
