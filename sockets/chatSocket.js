const moment = require('moment');

const date = moment().format('DD-MM-YYYY HH:mm:ss A');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', ({ chatMessage, nickname }) => {
      io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
    });
  });
};
