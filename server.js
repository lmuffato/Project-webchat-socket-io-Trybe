require('dotenv/config');
const express = require('express');
// const cors = require('cors');
const app = express();
const PORT = process.env.BACKEND_PORT || 3000;
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: `https://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

// app.use(express.static(__dirname + '/public'));
app.use('/', express.static('./public'));

require('./sockets/chat')(io);

app.get('/', (req, res) => {
  res.sendFile('./public/index.html');
});

server.listen(PORT, () => console.log(`Webchat server running on port ${PORT}!`));
