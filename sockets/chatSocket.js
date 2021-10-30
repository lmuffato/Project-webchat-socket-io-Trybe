const chatModel = require('../models/chatModel');

const usersId = {};

module.exports = (io) => {
  io.on('connection', (socket) => {
    usersId[socket.id] = socket.id.slice(0, 16);
    io.emit('randomNickname', Object.values(usersId));

    socket.on('message', async (chatInfo) => {
      const message = await chatModel.chatMessages(chatInfo);
      io.emit('message', message);
    });
    socket.on('newUserList', (newUsers) => {
      usersId[socket.id] = newUsers;
      io.emit('randomNickname', Object.values(usersId));
    });
    socket.on('disconnect', () => {
      delete usersId[socket.id];
      io.emit('randomNickname', Object.values(usersId));
    });
  });
};
