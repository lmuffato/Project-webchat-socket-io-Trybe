const connection = require('./connection');

const createMsg = async (data) => {
  const db = await connection();
  const msg = await db.collection('messages').insertOne({ data });
  return { id: msg.insertedId, ...data };
};

const getAllMessages = async () => {
  const db = await connection();
  const allMessages = await db.collection('messages').find().toArray();
  return allMessages;
};

module.exports = {
  createMsg,
  getAllMessages,
};