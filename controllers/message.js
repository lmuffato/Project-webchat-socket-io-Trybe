const MessageModel = require('../models/message');

const getAll = async () => {
  const messages = await MessageModel.getAll();
  return messages;
};

const create = async (message) => {
  const newMessage = await MessageModel.create(message);
  console.log('NEW MESSAGE DO CONTROLLER ==>', newMessage);
  return newMessage;
};

module.exports = {
  getAll,
  create,
};
