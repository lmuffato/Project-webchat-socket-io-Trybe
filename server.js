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
    origin: `http://localhost:${EXPRESS_PORT}`,
    methods: ['GET', 'POST'],
  },
});

const User = require('./models/User');

io.on('connection', (socket) => {
  console.log(`Conexão- ${socket.id}`);
  io.emit('newUser', socket.id);

  socket.on('message', async ({ chatMessage, nickname }) => {
    const addMessage = await User.newMessage(chatMessage, nickname);
    if (addMessage) {
        const data = new Date();

        const dia = String(data.getDate()).padStart(2, '0');

        const mes = String(data.getMonth() + 1).padStart(2, '0');

        const ano = data.getFullYear();

        const dataAtual = `${dia}-${mes}-${ano}`;
        const horaAtual = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;

        const newMessage = `${dataAtual} ${horaAtual} ${nickname} : ${chatMessage}`;
        console.log(newMessage);
        io.emit('message', newMessage);
    }
});
});

app.get('/user', async (_req, res) => {
    const user = await User.getAll();
  
    res.status(200).json(user);
  });

app.get('/', (_req, res) => {
    res.render('webchat/index.ejs');
    });

// app.post('/user', async (req, res) => {
//     const {nickName} = req
//     const newUser = await User.createUser();
// });

server.listen(EXPRESS_PORT, () => {
  console.log('Server escutando na porta 3000');
});
