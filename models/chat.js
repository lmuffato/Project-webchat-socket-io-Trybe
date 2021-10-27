const connection = require('./connection');

const saveMessage = async (timestamp, nickname, message) => {
  const db = await connection();
  await db.collection('messages').insertOne({ message, timestamp, nickname });
};

const getMessages = async () => {
  const db = await connection();
  const result = db.collection('messages').find({}).toArray();

  return result;
};

module.exports = {
  saveMessage,
  getMessages,
};
