const http = require('http');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const message = require('./sockets/message');
const app = require('./app');

dotenv.config();

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

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
