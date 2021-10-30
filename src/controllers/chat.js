const modelMessages = require('../models/messages');

module.exports = async (_req, res) => {
  const messages = await modelMessages.getAll();
  res.status(200).render('chat', { messages });
};