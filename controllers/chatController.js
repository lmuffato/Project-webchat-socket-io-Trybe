const chatModel = require('../models/chatModel');

const renderChat = async (_req, res) => {
  const messages = await chatModel.getMessages();
  res.status(200).render('index', { messages });
};

module.exports = {
  renderChat,
};
