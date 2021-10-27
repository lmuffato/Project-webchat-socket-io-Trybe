const moment = require('moment');

module.exports = (io) => {
  io.on('connection', (socket) => {
    // const nickname = socket.id.substring(0, 16);
  
    socket.on('message', ({ nickname, chatMessage }) => {
      const timestamp = moment().format('DD-MM-yyyy hh:mm:ss A');
      io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
    });
  });
};