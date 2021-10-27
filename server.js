const express = require('express');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');

app.set('view engine', 'ejs');
app.set('views', './public');

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  } });
  const { getAllMessages } = require('./models/chatModel');
  
  app.use(cors());

  require('./sockets/chatSocket')(io);

app.use(express.static(`${__dirname}/public`));

app.get('/', async (req, res) => {
  const allinfos = await getAllMessages();
  const message = allinfos
  .map((info) => `${info.timestamp} ${info.nickname}: ${info.message}`);
  res.status(200).render(`${__dirname}/public/index.ejs`, { message });
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});