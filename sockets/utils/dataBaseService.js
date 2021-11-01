const { dateConvertBrasilAMPM } = require('./dateService.js');
const Model = require('../../models/messages/messageModels.js');

// Salvar mensagem no banco de dados
const saveMessageOnDataBase = async (userMsg, nickName) => {
  const obj = {
    message: userMsg,
    nickname: nickName,
    timestamp: dateConvertBrasilAMPM(),
  };
  await Model.create(obj);
};

// recuperar as mensagens do banco de dados
const retrieveMessageHistory = async (socket) => {
  const oldMsg = await Model.getAll();
  socket.emit('msgHistoric', oldMsg);
  return oldMsg;
};

module.exports = { saveMessageOnDataBase, retrieveMessageHistory };
