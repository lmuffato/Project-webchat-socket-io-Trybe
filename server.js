const cors = require('cors');
const express = require('express');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');

const EXPRESS_PORT = 3000;

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: `http://localhost:${EXPRESS_PORT}`,
    method: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, 'src')));
app.set('views', path.join(__dirname, 'src'));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.use('/', (req, res) => {
  res.render('index');
});

const dataHora = new Date();
const dataFormat = `${dataHora.getDay()}-${dataHora.getMonth()}-${dataHora.getFullYear()}`;
const horaFormat = `${dataHora.getHours()}:${dataHora.getMinutes()}:${dataHora.getSeconds()}`;
const timestamp = `${dataFormat} ${horaFormat}`; 

let nickName = '';

io.on('connection', (socket) => { // socket
  const ID_ALEATORIO = socket.id.substring(0, 16);
  io.emit('newUser', ID_ALEATORIO);

  socket.on('message', ({ chatMessage, nickname }) => {
    nickName = nickname || ID_ALEATORIO;

    io.emit('message', `${timestamp} - ${nickName}: ${chatMessage}`);
  });
});

app.get('/', (_req, res) => {
  res.render('index.html');
});

server.listen(EXPRESS_PORT, () => {
  console.log(`Servidor ouvindo na porta ${EXPRESS_PORT}`);
});