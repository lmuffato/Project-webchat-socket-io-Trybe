const moment = require('moment');
const webChatModel = require('../models/WebChat');

module.exports = async ({ socketId, nickname, chatMessage, io, users }) => {
  if (!socketId) {
    const timestamp = moment().format('DD-MM-YYYY HH:mm:ss A');
    const message = `${timestamp} - ${nickname}: ${chatMessage}`;
    await webChatModel.createMessage({ chatMessage, nickname });
    io.emit('message', message);
    return;
  }
  const nickName = users[socketId];
  const timestamp = moment().format('DD-MM-YYYY HH:mm:ss A');
  const message = `${timestamp} - ${nickName}: ${chatMessage}`;
  await webChatModel.createMessage({ chatMessage, nickname });
  io.emit('message', message);
};