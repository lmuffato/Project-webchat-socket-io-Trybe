const chatModels = require('../models/messages');

const getAllMessages = async (_req, res) => {
  const oldMessages = await chatModels.getAllMessages();
  res.render('chat', { oldMessages });
};

const saveMessages = async (dataMessage) => {
  await chatModels.saveMessages(dataMessage);
};

module.exports = {
  getAllMessages,
  saveMessages,
};