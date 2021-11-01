const connection = require('./connection');

const saveMessages = async (data) => {
  const db = await connection();
  const newMessage = db.collection('messages').insertOne(data);
  return newMessage;
};

const getAllMessages = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find({}).toArray();
  return messages;
};

module.exports = {
  saveMessages,
  getAllMessages,
};
