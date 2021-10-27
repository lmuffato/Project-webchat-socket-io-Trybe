const moment = require('moment');

const messageMoment = moment().format('DD-MM-yyyy HH:mm:ss A');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', ({ chatMessage, nickname }) => {
      io.emit('message', `${messageMoment} - ${nickname}: ${chatMessage}`);
    });
  });
};