const generateFormatedDate = require('../utils/generateFormatedDate');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`${socket.username} acabou de entrar`);
    socket.on('message', ({ chatMessage, nickname = socket.username }) => {
      const date = generateFormatedDate();
      const message = `${date} ${nickname} ${chatMessage}`;
      io.emit('message', message);
    });

    socket.on('disconnect', () => {
      console.log(`${socket.username} saiu`);
    });
  });
};
