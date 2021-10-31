// Faça seu código aqui
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const chatModel = require('./models/chatModel');
require('./sockets/chatSocket')(io);

app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  const chatMessages = await chatModel.getAllMessages();

  res.render('index.ejs', { chatMessages });
});

http.listen(3000, () => {
  console.log('conectado porta 3000');
});