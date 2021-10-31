const chatModel = require('../models/chatModel');

const HTTP_OK = 200;

const getHistory = async (req, res) => {
  const { message, nickname, timestamp } = await chatModel.getHistory();

  res.status(HTTP_OK).render('chatView', { message, nickname, timestamp });
};

module.exports = {
  getHistory,
};