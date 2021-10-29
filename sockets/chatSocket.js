const moment = require('moment');

const usersList = {};

module.exports = (io) => {
  io.on('connection', (socket) => {
    usersList[socket.id] = socket.id.substring(0, 16);
    io.emit('onlineUsers', Object.values(usersList));

    socket.on('nickname', (nick) => {
      usersList[socket.id] = nick;
      io.emit('onlineUsers', Object.values(usersList));
    });
  
    socket.on('message', async ({ nickname, chatMessage }) => {
      const timestamp = moment().format('DD-MM-yyyy hh:mm:ss A');
      io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
    });

    socket.on('disconnect', () => {
      delete usersList[socket.id];
      io.emit('onlineUsers', Object.values(usersList));
    });
  });
};