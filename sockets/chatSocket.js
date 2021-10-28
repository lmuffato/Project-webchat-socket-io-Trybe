/* eslint-disable max-lines-per-function */
const moment = require('moment');

const messageMoment = moment().format('DD-MM-yyyy HH:mm:ss A');
const userList = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    const { id } = socket;
    const randomNick = id.substr(0, 16);

    userList.push({
      id,
      genericUser: randomNick,
    });

    console.log(userList);
    io.emit('addNewUser', randomNick);

    socket.on('message', ({ chatMessage, nickname }) => {
      io.emit('message', `${messageMoment} - ${nickname}: ${chatMessage}`);
    });

    socket.on('replaceUser', ({ oldUser, newUser }) => {
      userList.forEach(({ genericUser }, i) => {
        if (genericUser === oldUser) userList[i].genericUser = newUser;
      });
      console.log(userList);
    });

    socket.on('disconnect', () => {
      userList.forEach((user, i) => {
        if (user.id === socket.id) userList.splice(i, 1);
      });
    });
  });
};