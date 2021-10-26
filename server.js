const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const message = require('./sockets/message');

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const ioOptions = {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
};

const io = new Server(server, ioOptions);

message(io);

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/test', (_req, res) => {
  res.status(200).render('test-client');
});

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
