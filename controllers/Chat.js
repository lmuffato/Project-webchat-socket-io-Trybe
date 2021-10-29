const Chat = require('../models/Chat');

const getMessages = async (_req, res) => {
  const result = await Chat.getMessages();
  res.status(200).json(result);
};

module.exports = { getMessages };
