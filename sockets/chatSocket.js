const moment = require('moment');

const messageMoment = moment().format('DD-MM-yyyy HH:mm:ss A');
const userList = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    const userId = socket.id.substr(0, 16);

    userList.push(userId);
    console.log(userList);

    io.emit('connected', userList);

    socket.on('message', ({ chatMessage, user }) => {
      io.emit('message', `${messageMoment} - ${user}: ${chatMessage}`);
    });

    socket.on('disconnect', () => {
      userList.forEach((item, i) => {
        if (item === userId) userList.splice(i, 1);
      });

      io.emit('userList', userList);
    });
  });
};