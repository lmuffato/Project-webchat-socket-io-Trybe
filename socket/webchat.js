const getCurrentDate = require('../utils/dateTime');

/**
 * @param {import('socket.io').Socket} socket
 * @param {import('socket.io').Server} server
 */
module.exports = (socket, server) => {
  socket.on('message', ({ nickname, chatMessage }) => {
    const currentDate = getCurrentDate().fulldate;
    const currentTime = getCurrentDate().fulltime;
    const message = `${currentDate} ${currentTime} ${nickname} ${chatMessage}`;
    console.log(message);
    server.emit('message', message);
  });
};
