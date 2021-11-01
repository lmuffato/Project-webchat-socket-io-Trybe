const conexao = require('./connection');

const enviarMsgDB = async ({ timeLog, nickname, chatMessage }) => {
  const db = await conexao();
  const enviar = await db.collection('messages').insertOne({ timeLog, nickname, chatMessage });
  return enviar;
};
const receberMsgDB = async () => {
  const db = await conexao();
  const receber = await db.collection('messages').find().toArray();
  return receber;
};

module.exports = {
  enviarMsgDB,
  receberMsgDB,
};  