const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const webchatSocket = require('./socket/webchat');
const { get } = require('./models/message');

const app = express();
const server = http.createServer(app);
const ioServer = new Server(server);

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.render('./index');
});

const users = [];

ioServer.on('connection', async (socket) => {
  // socket.disconnect(0);
  console.log(socket.id);
  socket.emit('show-history', await get());
  webchatSocket(socket, ioServer, users);
});

server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
