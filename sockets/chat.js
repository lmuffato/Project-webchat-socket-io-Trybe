const generateFormatedDate = require('../utils/generateFormatedDate');
const changeNick = require('./changeNick');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', ({ chatMessage, nickname }) => {
      const date = generateFormatedDate();
      const message = `${date} ${nickname || socket.nickname} ${chatMessage}`;
      io.emit('message', message);
    });

    socket.broadcast.emit('serverMessage', {
      message: `${socket.nickname} acabou de entrar.`,
    });
    
    io.emit('connection', socket.nickname);

    socket.on('disconnect', () => {
      socket.broadcast.emit('serverMessage', {
        message: `${socket.nickname} saiu.`,
      });
    });

    changeNick(io, socket);
  });
};
