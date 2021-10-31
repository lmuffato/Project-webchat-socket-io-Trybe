const chatModel = require('../models/chat');

const createMessage = async (messages) => {
  await chatModel.createMessage(messages);
};

const getAllMessages = async () => {
  const messages = await chatModel.getAllMessages();
  return messages;
};

module.exports = { createMessage, getAllMessages };
