const connection = require('./connection');

const create = async ({ timestamp, nickname, message }) => {
  const db = await connection();
  await db.collection('messages').insertOne({ timestamp, nickname, message });
};

const getAll = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find({}).toArray();
  return messages;
};

module.exports = {
  create,
  getAll,
};