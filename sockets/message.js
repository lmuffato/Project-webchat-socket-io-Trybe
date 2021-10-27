const generateFormatedDate = require('../utils/generateFormatedDate');

module.exports = (socket) =>
  socket.on('message', ({ chatMessage, nickname = socket.username }) => {
    const date = generateFormatedDate();
    const message = `${date} ${nickname} ${chatMessage}`;
    io.emit('message', message);
  });
