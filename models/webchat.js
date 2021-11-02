const connection = require('./connection');

const MESSAGES = 'messages';

const getAll = async () => {
  const db = await connection();
  const result = await db.collection(MESSAGES).find({}).toArray();
  return result;
};

const create = async (doc) => {
  const db = await connection();
  const { ops } = await db.collection(MESSAGES)
    .insertOne({ message: doc.chat, nickname: doc.name, timestamps: doc.timestamp });
  return ops[0];
};

module.exports = {
  getAll,
  create,
};
