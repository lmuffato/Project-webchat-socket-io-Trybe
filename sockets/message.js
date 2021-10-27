const Message = require('../models/Message');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`New connection. Id: ${socket.id}`);

    socket.on('message', async ({ chatMessage, nickname }) => {
      const dateStr = new Date().toLocaleString('en-GB').replace(/\//g, '-').replace(',', '');

      await Message.saveMessage({ message: chatMessage, nickname, timestamp: dateStr });
      const message = `(${dateStr}) ${nickname}: ${chatMessage}`;
      io.emit('message', message);
    });
  });
};
