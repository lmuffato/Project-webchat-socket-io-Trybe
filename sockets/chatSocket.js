const sendMessage = require('./sendMessage');
const login = require('./login');
const disconnect = require('./disconnect');

const usersOn = {};

module.exports = (io) => io.on('connection', (socket) => {
  //  socket.disconnect(0);
  const randomName = socket.id.slice(-16);

  login(io, socket, randomName, usersOn);

  const users = Object.entries(usersOn);

  socket.on('message', async ({ chatMessage, nickname }) => {
    await sendMessage(io, { chatMessage, nickname });
  });

  socket.on('updateNick', (nick) => {
    io.emit('nickname', nick);
    usersOn[socket.id] = nick;
    io.emit('login', usersOn);
  });

  if (users[0][0] !== socket.id) {
    socket.emit('updateList', users);
  }

  disconnect(socket, io, usersOn);
});