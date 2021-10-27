const generateFormatedDate = require('../utils/generateFormatedDate');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`${socket.username} acabou de entrar`);
    socket.on('message', ({ chatMessage, nickname = socket.username }) => {
      const date = generateFormatedDate();
      const message = `${date} ${nickname} ${chatMessage}`;
      io.emit('message', message);
    });

    socket.emit('message', 'Seja bem vindo(a) ao chat!');

    socket.broadcast.emit('serverMessage', {
      message: `${socket.username} acabou de entrar`,
    });

    socket.on('disconnect', () => {
      console.log(`${socket.username} saiu`);
    });
  });
};
