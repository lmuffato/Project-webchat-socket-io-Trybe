const chatModel = require('../models/chatModel');

const showWebChat = async (_req, res) => {
  const messages = await chatModel.readAll();

  // console.log(messages);

  res.render('chat.ejs', { messages });
};

module.exports = {
  showWebChat,
};