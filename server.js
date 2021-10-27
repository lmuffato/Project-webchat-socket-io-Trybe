const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const EXPRESS_PORT = 3000;
const SOCKETIO_PORT = 5000;

const app = express();

const socketIoServer = require('http').createServer();

const io = require('socket.io')(socketIoServer, {
  cors: { 
    origin: `http://localhost:${EXPRESS_PORT}`, 
    methods: ['GET', 'POST'], 
  },
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(
  cors({
    origin: `http://localhost:${EXPRESS_PORT}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization'],
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/assets', express.static('./assets/client'));
app.use('/assets', express.static('./assets/style'));

app.get('/', async (req, res) => {
  res.status(200).render('webchat');
});

io.on('connection', async (socket) => {
  const { id } = socket;

  socket.emit('nickname', (id.slice(0, 16)));
});

app.listen(EXPRESS_PORT, () => {
  console.log(`Express app listening on port ${EXPRESS_PORT}`);
});

socketIoServer.listen(SOCKETIO_PORT, () => {
  console.log(`Socket.io server listening on port ${SOCKETIO_PORT}`);
});
