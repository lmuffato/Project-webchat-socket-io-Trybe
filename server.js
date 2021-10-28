// Back-end server
const express = require('express'); // ok
const bodyParser = require('body-parser'); // ok

require('dotenv').config();

const app = express(); // ok

const socketIoServer = require('http').createServer(app);
const io = require('socket.io')(socketIoServer, {
  cors: { // Aqui existe um objeto de configuração, essas options são necessárias a partir da major 3 do socket.io 
    origin: `http://localhost:${process.env.EXPRESS_PORT}`, // origem permitida
    methods: ['GET', 'POST'], // métodos permitidos
  },
});

const NEW_NOTIFICATION = [];

io.on('connection', (socket) => {
  socket.emit('chat', NEW_NOTIFICATION);
  console.log(`novo usuário ${socket.id}  conectado ao socket.io`);
});

app.set('view engine', 'ejs');
app.set('views', './public/views');

app.use(bodyParser.json()); // ok
app.use(bodyParser.urlencoded({ extended: true })); // ok

/* app.use('/assets', express.static('./assets/javascripts'));
app.use('/assets', express.static('./assets/css'));
 */

app.get('/chat/ssr', (req, res) => {
  res.render('ssr/chat', { notifications: NEW_NOTIFICATION });
});

/* app.get('/chat/ssr', (req, res) => {
  res.render('ssr/chat copy', { notifications: NEW_NOTIFICATION });
}); */

app.post('/message', (req, res) => { // ok
  const { notification } = req.body;

  NEW_NOTIFICATION.push(notification); // Criar um db para salvar as mensagens

  io.emit('/message', notification);

  res.status(201).json({ message: 'Notified successfully' });
});

app.listen(
  process.env.EXPRESS_PORT, () => 
  console.log(`Express app listening on port ${process.env.EXPRESS_PORT}!`),
  );

socketIoServer.listen(
  process.env.SOCKETIO_PORT, 
  console.log(`Socket.io server listening on port ${process.env.SOCKETIO_PORT}!`),
  ); // ok