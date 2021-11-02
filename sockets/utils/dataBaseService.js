const { dateConvertBrasilAMPM } = require('./dateService.js');
const Model = require('../../models/messages/messageModels.js');

// Salvar mensagem no banco de dados
const saveMessageOnDataBase = async (userMsg, nickName) => {
  try {
    const obj = {
      message: userMsg,
      nickname: nickName,
      timestamp: dateConvertBrasilAMPM(),
    };
    await Model.create(obj);
  } catch (err) { return console.log(err); }
};

// recuperar as mensagens do banco de dados
const retrieveMessageHistory = async (socket) => {
  try {
  const oldMsg = await Model.getAll();
  socket.emit('msgHistoric', oldMsg);
  return oldMsg;
  } catch (err) { return console.log(err); }
};

module.exports = { saveMessageOnDataBase, retrieveMessageHistory };
