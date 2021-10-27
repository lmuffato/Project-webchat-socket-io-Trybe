const http = require('http');
const dotenv = require('dotenv');
const SocketIO = require('socket.io');
const app = require('./app');
const messagesSocket = require('./sockets/message');

dotenv.config();

const server = http.createServer(app);
const io = SocketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
messagesSocket(io);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
