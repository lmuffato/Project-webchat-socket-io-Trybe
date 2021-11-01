const moment = require('moment');
const getCurrentDate = require('../utils/dateTime');
const { create } = require('../models/message');

/**
 * @param {import('socket.io').Socket} socket
 * @param {import('socket.io').Server} server
 */
module.exports = (socket, server) => {
  socket.on('message', ({ nickname, chatMessage }) => {
    const currentDate = getCurrentDate().fulldate;
    const currentTime = getCurrentDate().fulltime;
    const message = `${currentDate}|${currentTime}|${nickname}|${chatMessage}`;
    create({
      message: chatMessage,
      nickname,
      timestamp: moment().format('YYYY-MM-DD hh:mm:ss'),
    });
    server.emit('message', message);
    socket.emit('author-message', message);
  });
};
