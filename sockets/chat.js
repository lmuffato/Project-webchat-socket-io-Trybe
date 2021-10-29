const changeNick = require('./changeNick');
const message = require('./message');

module.exports = (io) => {
  io.on('connection', (socket) => {
    message(io, socket);
    changeNick(io, socket);

    socket.broadcast.emit('serverMessage', {
      message: `${socket.nickname} acabou de entrar.`,
    });

    socket.emit('connection', socket.nickname);

    socket.on('disconnect', () => {
      socket.broadcast.emit('serverMessage', {
        message: `${socket.nickname} saiu.`,
      });
    });
  });
};
