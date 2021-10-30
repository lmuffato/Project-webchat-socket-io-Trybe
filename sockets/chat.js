const moment = require('moment');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const newData = moment().format('DD-MM-yyyy HH:mm:ss');
    io.emit('message', `${newData} ${nickname}: ${chatMessage}`);
  });
});
