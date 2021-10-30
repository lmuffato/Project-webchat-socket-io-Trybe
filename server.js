const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { format } = require('date-fns');

require('dotenv').config();

const app = express();
const server = require('http').createServer(app);

const time = format(new Date(), 'dd-MM-yyyy HH:mm:ss');

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(server, {
  cros: {
    origin: 'http://localhost:3000',
    method: [
      'GET',
      'POST',
    ],
  },
});

app.use(bodyParser.json());
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id}`);
  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit('message', `${time} ${nickname}: ${chatMessage}`);
  });
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
