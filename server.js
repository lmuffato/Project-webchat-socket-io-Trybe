// Faça seu código aqui
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const socketIoServer = require('http').createServer(app);

const io = require('socket.io')(socketIoServer, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

const chatSocket = require('./sockets/connectionSocket');
const { consolidateDateAndTime } = require('./middlewares/dateAndTime');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

chatSocket(io);
app.use('/', (req, res) => {
  consolidateDateAndTime();
  res.render('index');
});

socketIoServer.listen(PORT, console.log(`Socket.io server listening on port: ${PORT}`));
