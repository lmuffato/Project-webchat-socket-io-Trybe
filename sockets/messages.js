const chatController = require('../controllers/chat');

module.exports = (io) => io.on('connection', async (_socket) => {
  const allMessages = await chatController.getAllMessages();
  console.log(allMessages);
  io.emit('get-messages', allMessages);
});