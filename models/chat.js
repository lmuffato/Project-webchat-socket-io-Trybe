const connection = require('./connection');

const getMessage = async ({ timestamp, nickname, chatMessage }) => {
  const db = await connection();
  const result = await db.collection('messages')
  .insertOne({ timestamp, nickname, chatMessage });
  return result;
};
const getAllMessages = async () => {
  const db = await connection();
  const result = await db.collection('messages').find().toArray();
  return result;
};

module.exports = {
  getMessage,
  getAllMessages,
};