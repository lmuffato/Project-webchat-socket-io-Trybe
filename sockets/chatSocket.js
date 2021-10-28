const moment = require('moment');

const messageMoment = moment().format('DD-MM-yyyy HH:mm:ss A');
const userList = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    const { id } = socket;
    const genericUser = id.substr(0, 16);

    userList.push({ id, genericUser });

    io.emit('addNewUser', genericUser);

    socket.on('message', ({ chatMessage, nickname }) => {
      io.emit('message', `${messageMoment} - ${nickname}: ${chatMessage}`);
    });

/*     socket.on('disconnect', () => {
      userList.forEach((item, i) => {
        if (item === userId) userList.splice(i, 1);
      });

      io.emit('userList', userList);
    }); */
  });
};