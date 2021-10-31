const moment = require('moment');

const timestamp = moment().format('DD-MM-YYYY HH:mm:ss');
const users = [];

module.exports = (io) => {
  io.on('connection', (socket) => { 
    users[socket.id.slice(0, 16)] = socket.id.slice(0, 16);
    const usersNick = Object.values(users);
    const nick = usersNick.filter((n) => n === socket.id.slice(0, 16));
    socket.emit('userName', nick);

    io.emit('userList', Object.values(users));
    socket.on('message', ({ chatMessage, nickname }) => {
      io.emit('message', `${timestamp} - ${nickname} : ${chatMessage}`);
    });

    socket.on('newNickname', (nickname) => {
      console.log(nickname);
      users[socket.id.slice(0, 16)] = nickname;
      console.log(usersNick, users);

      io.emit('userList', Object.values(users));
    });
  });
};