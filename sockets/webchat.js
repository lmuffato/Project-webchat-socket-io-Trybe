const Helpers = require('../utils/helpers');

const allUsers = {};

const webchat = (io) => {
  io.on('connection', async (socket) => {
    socket.emit('allMessages', await Helpers.allMessages());
    allUsers[socket.id] = socket.id.substring(0, 16);
    io.emit('allUsers', Object.values(allUsers));

    socket.on('nickname', (nickname) => {
      allUsers[socket.id] = nickname;
      io.emit('allUsers', Object.values(allUsers));
    });
  
    socket.on('message', (data) => Helpers.generetorMessage(data, io));
  
    socket.on('disconnect', () => {
      delete allUsers[socket.id];
      io.emit('allUsers', Object.values(allUsers));
    });
  });
};

module.exports = webchat;