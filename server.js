const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const { Server } = require('socket.io');

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

io.on('connection', (socket) => {
  console.log('New connection. Id: ' + socket.id);
});

app.get('/test', (_req, res) => {
  res.status(200).send('OK');
});

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
