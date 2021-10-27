const { consolidateDateAndTime } = require('../middlewares/dateAndTime');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Usuário conectado. ID: ${socket.id}`);

    socket.emit('setNick', socket.id);

    socket.on('message', (msg) => {
      const { chatMessage, nickname } = msg;
      const msgToSend = `${consolidateDateAndTime()} ${nickname}: ${chatMessage}`;

      io.emit('message', msgToSend);
    });
  });
};
