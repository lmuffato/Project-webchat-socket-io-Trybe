const chatModel = require('../models/chatModel');

const showChat = async (_req, res) => {
  const messages = await chatModel.readAllMessages();
  res.render('index.ejs', { messages });
};

module.exports = { showChat };