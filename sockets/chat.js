const moment = require('moment');
const chatModel = require('../models/chatModel');

module.exports = (io) => io.on('connection', async (socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const newData = moment().format('DD-MM-yyyy HH:mm:ss');
    await chatModel.create(chatMessage, newData, nickname);
    io.emit('message', `${newData} ${nickname}: ${chatMessage}`);
  });
  
  const messages = await chatModel.getAll();

  const messagesFormatted = messages
    .map(({ contentMessage, time, nick }) => `${time} ${nick}: ${contentMessage}`);

  socket.emit('messageHistory', messagesFormatted);
});
