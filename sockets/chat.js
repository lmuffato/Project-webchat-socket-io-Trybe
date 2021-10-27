const generateFormatedDate = require('../utils/generateFormatedDate');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', ({ chatMessage, nickname = socket.username }) => {
      const date = generateFormatedDate();
      const message = `${date} ${nickname} ${chatMessage}`;
      io.emit('message', message);
    });

    socket.broadcast.emit('serverMessage', {
      message: `${socket.username} acabou de entrar.`,
    });

    socket.on('disconnect', () => {
      socket.broadcast.emit('serverMessage', {
        message: `${socket.username} saiu.`,
      });
    });
  });
};
