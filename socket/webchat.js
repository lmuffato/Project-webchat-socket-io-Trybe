const moment = require('moment');
const getCurrentDate = require('../utils/dateTime');
const { create } = require('../models/message');

/**
 * @param {import('socket.io').Socket} socket
 * @param {import('socket.io').Server} server
 * @param {Array} users
 */
function createMessage(nickname, chatMessage) {
  const currentDate = getCurrentDate().fulldate;
  const currentTime = getCurrentDate().fulltime;
  const message = `${currentDate}|${currentTime}|${nickname}|${chatMessage}`;
  create({
    message: chatMessage,
    nickname,
    timestamp: moment().format('YYYY-MM-DD hh:mm:ss'),
  });
  return message;
}

function createOrUpdateUser(users, socket, nickname) {
  const index = users.findIndex((user) => user.id === socket.id);
  if (index >= 0) {
    users.splice(index, 1, { id: socket.id, nickname });
  } else {
    users.push({ id: socket.id, nickname });
  }
}

module.exports = (socket, server, users) => {
  socket.on('message', ({ nickname, chatMessage }) => {
    const message = createMessage(nickname, chatMessage);
    server.emit('message', message);
    socket.emit('author-message', message);
  });

  socket.on('new-user', (nickname) => {
    createOrUpdateUser(users, socket, nickname);
    server.emit('show-users', users);
  });

  socket.on('disconnect', () => {
    const index = users.findIndex((user) => user.id === socket.id);
    users.splice(index, 1);
    server.emit('show-users', users);
    console.log(socket.id);
  });
};
