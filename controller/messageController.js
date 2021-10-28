const model = require('../models/messageModel');

const insertMessage = async (id, chatMessage, nickname, timestamp) => model
  .insertMessage({ id, chatMessage, nickname, timestamp });

const findAll = async () => model.findAll();

const updateNickname = async (id, nickname) => model.updateNickname(id, nickname);

module.exports = {
  insertMessage,
  findAll,
  updateNickname,
};
