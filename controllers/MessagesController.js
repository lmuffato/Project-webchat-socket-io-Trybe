const model = require('../models/Messages');

const getAllMessages = async () => model.getMessages();

const createMessage = async (id, chatMessage, nickname, timestamp) => model
  .createNewMessage({ id, chatMessage, nickname, timestamp });

const updateMessage = async (id, nickname) => model.updateMessage(id, nickname);

module.exports = {
  createMessage,
  getAllMessages,
  updateMessage,
};
