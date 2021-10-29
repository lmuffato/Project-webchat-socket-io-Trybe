const messageModel = require('../models/messages');

const getAllMessages = async (req, res) => {
  const allMessages = await messageModel.getAllMessages();
  res.status(200).json(allMessages);
};

const sendMessage = async (req, res) => {
  const { message, nickname, timestamp } = req.body;
  const messageObj = {
    message,
    nickname,
    timestamp,
  };
  const result = await messageModel.sendMessage(messageObj);
  res.status(200).json(result);
};

module.exports = {
  sendMessage,
  getAllMessages,
};