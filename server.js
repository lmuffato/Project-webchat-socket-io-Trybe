// Consegui fazer o Req1 durante uma chamada na sala 2 no dia 30/10/2021 com:
// Rafael Medeiros, Lucas Lara, Vini e Adelino Junior e Murilo Gonçalves.

// Agradecimento ao Guilherme Dornelles e Adelino Junior no requisito 2

const express = require('express');
const moment = require('moment');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: { origin: `http://localhost:${PORT}`, methods: ['GET', 'POST'] },
});

const { enviarMsgDB, receberMsgDB } = require('./models/webchat');

app.use(express.static('views'));
app.set('view engine', 'ejs');
app.set('views', './views');

const quemQuerTC = {}; // Se entendeu é porque você é da épcoa do MSN e do bate-papo do UOL!

io.on('connection', async (socket) => {
  console.log(`Usuário: ${socket.id} conectado!`); quemQuerTC[socket.id] = socket.id.slice(0, 16);

  socket.on('disconnect', () => {
    console.log(`Usuário: ${socket.id} está desconectado!`);
    delete quemQuerTC[socket.id]; io.emit('quemTaON', Object.values(quemQuerTC)); 
  });

  socket.on('message', async ({ chatMessage, nickname }) => {
    const timeLog = moment().format('DD-MM-yyyy HH:mm:ss');
    io.emit('message', `${timeLog} ${nickname}: ${chatMessage}`);
    await enviarMsgDB({ timeLog, nickname, chatMessage });
  });

  socket.on('novoUsername', (nickname) => {
    quemQuerTC[socket.id] = nickname; io.emit('quemTaON', Object.values(quemQuerTC));
  });

  const logDeMensagens = async () => {
    const mensagens = await receberMsgDB(); return mensagens;
  };

  io.emit('logDeMensagens', await logDeMensagens());
  io.emit('quemTaON', Object.values(quemQuerTC));
});

app.get('/', (req, res) => { res.render('index'); });

http.listen(3000, () => { console.log(`Servidor na atividade fechado com a porta ${PORT}`); });