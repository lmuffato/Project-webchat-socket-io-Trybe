const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find({}).toArray();

  return messages;
};

const create = async (message, nickname, timestamp) => {
  const db = await connection();
  await db.collection('messages').insertOne({ message, nickname, timestamp });
};

module.exports = { getAll, create };
