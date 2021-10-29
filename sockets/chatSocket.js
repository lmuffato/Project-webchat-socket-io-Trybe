const chatModel = require('../models/chatModel');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`alguém conectou ${socket.id}`);

    socket.on('message', async (chatInfo) => {
      const message = await chatModel.chatMessages(chatInfo);
      console.log(message);
      io.emit('message', message);
    });
  });
};
