const connection = require('./connection');

const getAllMessages = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find().toArray();
  return messages;
};

const insertMessage = async (message) => {
  const db = await connection();
  await db.collection('messages').insertOne(message);
};

module.exports = {
  getAllMessages,
  insertMessage,
};
