const connection = require('./connection');

const CHATS = 'chats';

const getAll = async () => {
  const db = await connection();
  const result = await db.collection(CHATS).find({}).toArray();
  return result;
};

module.exports = {
  getAll,
};
