const connection = require('./connection');

const MESSAGES = 'messages';

const getAll = async () => {
  const db = await connection();
  const result = await db.collection(MESSAGES).find({}).toArray();
  return result;
};

const create = async (doc) => {
  const { message, nickname, timestamp } = doc;
  const db = await connection();
  const result = await db.collection(MESSAGES).insertOne({ message, nickname, timestamp });
  return result;
};

module.exports = {
  getAll,
  create,
};
