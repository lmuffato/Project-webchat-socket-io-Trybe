const connection = require('./connection');

const saveMessage = async (data) => {
  const db = await connection();
  await db.collection('messages').insertOne(data);
};

const readAllMessages = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find({}).toArray();
  return messages;
};

module.exports = {
  saveMessage,
  readAllMessages,
};