const moment = require('moment');
const chatModel = require('../models/chatModel');

const getAllMessages = async () => {
  const messages = await chatModel.getAllMessages()
  .then((msgs) => msgs).catch((e) => console.log(e));
  return messages;
};

const createMessage = async (data) => {
  const generateTimeStamp = moment().format('DD-MM-yyyy, HH:mm:ss A');
  const newMessage = await chatModel.createMessage(data, generateTimeStamp)
  .then((res) => res).catch((e) => console.log(e));
  return newMessage;
};
// Source: documentação moment (formatação, parse, validação e manipulação de datas) --> https://momentjs.com

const excludeMessage = async (id) => {
  const remove = await chatModel.excludeMessage(id);

  return remove;
};

module.exports = {
  getAllMessages,
  createMessage,
  excludeMessage,
};
