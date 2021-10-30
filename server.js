const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.get('/test', (req, res) => res.status(200).json({ message: 'mensagem de teste' }));

const io = require('socket.io')(http, {
  cors: {
    orgin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));

require('./sockets/socket')(io);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/chat.html'));
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});