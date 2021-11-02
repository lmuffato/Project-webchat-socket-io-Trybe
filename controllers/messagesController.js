const messageModel = require('../models/message');

const messagesController = async (_req, res) => {
  const messages = await messageModel.getAllMessages();

  return res.status(200).render('index', { messages });
};

module.exports = { messagesController };