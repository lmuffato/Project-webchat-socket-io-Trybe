const connection = require('./connection');

const addMessage = async (data) => {
  const db = await connection();
  const message = await db.collection('messages').insertOne({ ...data });
  return message;
};

const findAllMessages = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find({}).toArray();
  if (messages) return messages;
  return null;
};

module.exports = {
  addMessage,
  findAllMessages,
};