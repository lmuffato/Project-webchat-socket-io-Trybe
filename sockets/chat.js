const moment = require('moment');

const timestamp = moment().format('DD-MM-YYYY HH:mm:ss');

module.exports = (io) => {
  io.on('connection', (socket) => { 
    socket.on('message', ({ chatMessage, nickname }) => {
      io.emit('message', `${timestamp} - ${nickname} : ${chatMessage}`);
    });
  });
};