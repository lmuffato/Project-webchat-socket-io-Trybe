const moment = require('moment');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.emit('idNickname', socket.id.substr(4, 20));

    socket.on('message', ({ chatMessage, nickname }) => {
      const dateAndOur = moment().format('DD-MM-YYYY h:mm:ss A');
      io.emit('message', `${dateAndOur} - ${nickname}: ${chatMessage}`);
    });
  });
};
