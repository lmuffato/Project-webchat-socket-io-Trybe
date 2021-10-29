const connection = require('./connection');

const createMessage = async (message) => {
  const db = await connection();
  const result = await db.collection('messages').insertOne({ message });
  return { id: result.insertedId, message };
};

const getAll = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find().toArray();
  return messages;
};

module.exports = {
  createMessage,
  getAll,
};