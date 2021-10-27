const moment = require('moment');
const { saveMessage } = require('../models/chatModel');

module.exports = async (io, { chatMessage, nickname }) => {
  const dataAtual = moment().format('DD-MM-YYYY');
  const horaAtual = moment().format('LTS');
  const message = `${dataAtual} ${horaAtual} - ${nickname}: ${chatMessage}`;
  io.emit('message', message);
  const timestamp = `${dataAtual} ${horaAtual}`;
  const data = { message: chatMessage, nickname, timestamp };
  await saveMessage(data);
};