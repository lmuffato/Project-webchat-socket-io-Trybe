const chatModel = require('../models/chatModel');

const users = {};

module.exports = (io) => {
  io.on('connection', (socket) => {
    users[socket.id] = socket.id.slice(0, 16);
    io.emit('randomNickname', Object.values(users));

    socket.on('message', async (chatInfo) => {
      const message = await chatModel.chatMessages(chatInfo);
      io.emit('message', message);
    });
    socket.on('newUserList', (newUsers) => {
      users[socket.id] = newUsers;
      io.emit('randomNickname', Object.values(users));
    });
  });
};
