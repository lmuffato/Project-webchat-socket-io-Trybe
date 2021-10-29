const generateFormatedDate = require('../utils/generateFormatedDate');
const Chat = require('../models/Chat');

module.exports = (io, socket) =>
  socket.on('message', async ({ chatMessage, nickname = socket.nickname }) => {
    const date = generateFormatedDate();
    const message = `${date} - ${nickname}: ${chatMessage}`;
    await Chat.createMessage({ nickname, chatMessage });
    io.emit('message', message);
  });
