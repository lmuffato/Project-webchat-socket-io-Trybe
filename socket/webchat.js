/**
 * @param {import('socket.io').Socket} socket
 */

const getCurrentDate = require('../utils/dateTime');

module.exports = (socket) => {
  socket.on('message', ({ nickname, chatMessage }) => {
    const currentDate = getCurrentDate().fulldate;
    const currentTime = getCurrentDate().fulltime;
    console.log(`${currentDate} ${currentTime} ${nickname} ${chatMessage}`);
  });
};
