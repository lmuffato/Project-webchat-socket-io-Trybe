const Helpers = require('../utils/helpers');

const allUsers = {};

const webchat = (io) => {
  io.on('connection', async (socket) => {
    socket.emit('allMessages', await Helpers.allMessages());

    allUsers[socket.id] = socket.id.substring(0, 16);
    io.emit('allUsers', Object.values(allUsers));
  
    socket.on('nickname', (data) => {
      allUsers[socket.id] = data;
      io.emit('allUsers', Object.values(allUsers));
    });
  
    socket.on('message', async (data) => io.emit('message', await Helpers.generetorMessage(data)));
  
    socket.on('disconnect', () => {
      delete allUsers[socket.id];
      io.emit('allUsers', Object.values(allUsers));
    });
  });
};

module.exports = webchat;