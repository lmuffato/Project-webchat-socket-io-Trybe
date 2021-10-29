const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').createServer(app);

const EXPRESS_PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/assets', express.static('./assets/javascripts'));
app.use('/assets', express.static('./assets/css'));

app.use(cors());
app.use(bodyParser.json());
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

let users = [];
const Users = require('./models/User');

function newData(chatMessage, nickname) {
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const dataAtual = `${dia}-${mes}-${ano}`;
  const horaAtual = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;
  const newMessage = `${dataAtual} ${horaAtual} ${nickname} : ${chatMessage}`;
  return newMessage;
}

const newMessageFunc = async ({ chatMessage, nickname }) => {
      if (users.length > 0) {
        const messageUser = users.find((user) => user.id === nickname);
        const newMessage = newData(chatMessage, messageUser.nick);
        await Users.newMessage(chatMessage, messageUser.nick);
        return io.emit('message', newMessage);
      }
        const message = newData(chatMessage, nickname);
        await Users.newMessage(chatMessage, nickname);
        io.emit('message', message);
};

function newNickFunc(data, socket) {
  const newArr = users.map((user) => {
    if (user.id === socket.id.substring(4)) return { ...user, nick: data.newNick };
    return user;
  });
  users = newArr;
  io.emit('newConnect', users);
  console.log(users);
}
io.on('connection', (socket) => {
  // socket.disconnect(0);
  io.emit('newUser', socket.id);
  socket.on('message', (data) => newMessageFunc(data));
  socket.on('newNick', (data) => newNickFunc(data, socket));
  socket.on('newConnect', (newConnetion) => {
    users.push({ nick: newConnetion, id: socket.id.substring(4) });
    
    io.emit('newConnect', users);
  });
  socket.on('disconnect', () => {
    const newArr = users.filter((user) => user.id !== socket.id.substring(4));
    users = newArr;
    io.emit('newConnect', users);
  });
});

app.get('/', async (_req, res) => {
    const messages = await Users.getAllMessages();
    res.render('webchat/index.ejs', { messages });
    });

// app.post('/user', async (req, res) => {
//     const {nickName} = req
//     const newUser = await User.createUser();
// });

server.listen(EXPRESS_PORT, () => {
  console.log('Server escutando na porta 3000');
});
