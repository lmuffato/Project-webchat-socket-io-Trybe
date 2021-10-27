const moment = require('moment');

module.exports = (io) => io.on('connection', (socket) => { 
  socket.on('message', ({ chatMessage, nickname }) => {
    const dateHours = moment().format('DD-MM-yyyy HH:mm:ss A');
    io.emit('message', `${dateHours} - ${nickname}: ${chatMessage}`);
  });
});