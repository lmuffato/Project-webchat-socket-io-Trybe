const connection = require('./connection');

const createModel = async ({ timestamp, nickname, message }) => {
  const db = await connection();
  await db.collection('messages').insertOne({ timestamp, nickname, message });
};

const readAll = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find({}).toArray();
  return messages;
};

module.exports = {
  createModel,
  readAll,
};