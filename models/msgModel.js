const connection = require('./connection');

const create = async ({ chatMessage, nickName: nickname, timestamp }) => {
  const db = await connection();
  const { insertedId: _id, ops } = await db.collection('messages')
    .insertOne({ message: chatMessage, nickname, timestamp });
  
  return { _id, ...ops };
};

const getAllMessages = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find().toArray();

  return messages;
};

module.exports = {
  create,
  getAllMessages,
};