const moment = require('moment');
const Model = require('../models/message');

const generetorMessage = async ({ chatMessage, nickname }) => {
  const timestamp = moment().format('DD-MM-yyyy HH:mm:ss A');
  await Model.create({ message: chatMessage, nickname, timestamp });
  return `${timestamp} - ${nickname}: ${chatMessage}`;
};

const allMessages = async () => {
  const messages = await Model.getAll();
  return messages;
};

module.exports = {
  generetorMessage,
  allMessages,
};