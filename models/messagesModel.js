const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find({}).toArray();

  return messages;
};

module.exports = { getAll };
