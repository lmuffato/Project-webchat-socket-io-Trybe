const sendMessage = require('./sendMessage');

const usersOn = {};


module.exports = (io) => io.on('connection', (socket) => {
  //  socket.disconnect(0);
  const randomName = socket.id.slice(-16);
  
  usersOn[socket.id] = randomName;

  const users = Object.entries(usersOn);

  io.emit('nickname', randomName);
  io.emit('login', usersOn);

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

  socket.on('disconnect', () => {
    socket.broadcast.emit('message', `Usuário ${socket.id} acabou de se desconectar! :(`);
    delete usersOn[socket.id]; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
    io.emit('login', usersOn);
  });
});