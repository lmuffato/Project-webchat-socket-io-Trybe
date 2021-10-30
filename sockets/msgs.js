const moment = require('moment');
const msg = require('../models/messages');

module.exports = (io) => io.on('connection', 
/**
 * @param {import('socket.io').Socket} socket
 */
  async (socket) => {
  const dbMessages = await msg.getAllMessages();
  socket.emit('dbMessages', dbMessages);
  socket.on('message', async ({ chatMessage, nickname }) => {
    const msgTime = moment().format('DD-MM-yyyy HH:mm:ss'); 
    await msg.createMsg({ message: chatMessage, nickname, timestamp: msgTime });
    io.emit('message', `${msgTime} ${nickname} ${chatMessage}`);
  });
});