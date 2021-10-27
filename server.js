const express = require('express');
const http = require('http');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

require('./sockets/message')(io);

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/test', (_req, res) => {
  res.status(200).render('test-client');
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
