const connection = require('./connection');

const saveMessage = async ({ message, nickname, timestamp }) => {
  const db = await connection();
  await db.collection('messages').insertOne({ message, nickname, timestamp });
};

const getMessages = async () => {
  const db = await connection();
  const message = await db.collection('messages').find().toArray();
  return message;
};

module.exports = {
  saveMessage,
  getMessages,
};
