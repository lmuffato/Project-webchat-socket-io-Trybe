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

io.on('connection', (socket) => { // socket
  console.log(`Alguém se conectou: ${socket.id}`);

  socket.on('message', ({ chatMessage, nickname }) => {
    console.log({ chatMessage, nickname });

    io.emit('message', `${dataFormat} ${horaFormat} PM - ${nickname}: ${chatMessage}`);
  });
});

// app.get('/teste', (req, res) => {
//   res.sendFile(`${__dirname}/index.html`);
// });

server.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});