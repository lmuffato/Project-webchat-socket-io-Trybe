// Faça seu código aqui

const app = require('express')();
const http = require('http').createServer(app);

const PORT = 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const Model = require('./models/messages');

const onlineUsers = {};

// quando a pessoa usuária se conecta, é executado o que está no io.on('connection')

io.on('connection', (socket) => {
  Model.getAllMessages().then((messages) => {
    socket.emit('messages', { messages, online: onlineUsers }); // manda apenas para quem emitiu; só pra quem acabou de se conectar
  });

  // esse nick é o que vem do randomNick
  socket.on('change-nickname', (nick) => {
    onlineUsers[socket.id] = nick; // vai popular o objeto onlineUsers de acordo com o emit que veio de dentro de 'messages' no .ejs;
    socket.broadcast.emit('change-nickname', { id: socket.id, nick }); // manda para todos exceto pra quem emitiu; vai pro frontend atualizar o nick e mostrar na tela
  });
  
  socket.on('message', (data) => {
    Model.storeMessage(data.chatMessage, data.nickname);
    io.emit('message', Model.formatMessage(data.chatMessage, data.nickname)); // manda para todos no frontend a msg formatada
  });
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index.ejs');
});

http.listen(PORT, () => console.log(`WEBCHAT PROJECT STARTED AT: ${PORT}`));

// first push to evaluator
