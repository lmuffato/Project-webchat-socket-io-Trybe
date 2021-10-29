// Faça seu código aqui
require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

const bodyParser = require('body-parser');

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  } });
const messagesController = require('./controllers/message');

const { PORT } = process.env;

app.use(bodyParser.json());

app.set('view engine', 'html');
app.set('views', './views');
app.engine('html', require('ejs').renderFile);

app.use('/', express.static(path.join(`${__dirname}./views`)));

// linha 17 adicionada seguindo solução proposta no tópico seguinte: 
// https://stackoverflow.com/questions/17911228/how-do-i-use-html-as-the-view-engine-in-express

const dateInteger = new Date();
const formatedDate = `${dateInteger
  .getDay()}-${dateInteger.getMonth()}-${dateInteger.getFullYear()}`;
const formatedHours = `${dateInteger
  .getHours()}:${dateInteger.getMinutes()}:${dateInteger.getSeconds()}`;

io.on('connection', (socket) => {
  socket.emit('wellcome', () => {
    console.log(`Usuário ${socket.id} seja bem-vindo`);
  });

  socket.on('message', ({ chatMessage, nickname }) => {
    console.log(`${formatedDate} ${formatedHours} - ${nickname}: ${chatMessage}`);
    io.emit('message', `${formatedDate} ${formatedHours} - ${nickname}: ${chatMessage}`);
  });
});

app.get('/', (_req, res) => {
  res.render('view.html');
});

app.get('/messages', messagesController.getAllMessages);

http.listen(PORT, () => {
  console.log(`Socket conectado na porta ${PORT}`);
});
