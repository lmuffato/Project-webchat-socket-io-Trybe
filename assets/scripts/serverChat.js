const moment = require('moment');

const Users = [];

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const dataHours = moment().format('DD-MM-yyyy HH:mm:ss A');
    io.emit('message', `${dataHours} - ${nickname}: ${chatMessage}`);
  });

  Users.push(socket.id.substring(0, 16));
  io.emit('show_Users', Users);

  socket.on('saveName', (nickname) => {
    Users.push(nickname);
    io.emit('show_Users', Users);
  });

  socket.on('disconnect', () => {
    Users.pop();
    io.emit('show_Users', Users);
  });
});