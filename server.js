require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const { PORT = 3000 } = process.env;

const socketIoServer = require('http').createServer(app);
const io = require('socket.io')(socketIoServer, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/assets', express.static('./assets/javascripts'));

const webchatSocket = require('./sockets/chatSocket');

webchatSocket(io);

app.get('/', (_req, res) => res.render('csr'));

socketIoServer.listen(PORT, () => console.log(`Socket listening on port ${PORT}.`));