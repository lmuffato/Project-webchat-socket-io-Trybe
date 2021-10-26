const http = require('http');
const dotenv = require('dotenv');
const socketIO = require('socket.io');
const app = require('./app');

dotenv.config();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
const message = require('./sockets/message');

message(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
