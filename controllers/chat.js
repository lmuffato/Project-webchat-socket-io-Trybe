const chatModels = require('../models/messages');

const getAllMessages = async (_req, res) => {
  const oldMessages = await chatModels.getAllMessages();
  res.render('chat', { oldMessages });
};

module.exports = {
  getAllMessages,
};