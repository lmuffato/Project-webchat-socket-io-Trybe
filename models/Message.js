const connection = require('./connection');

const COLLECTION = 'messages';

exports.getAll = async () => {
  const db = await connection();

  const messages = db.collection(COLLECTION).find().toArray();

  return messages;
};

exports.saveMessage = async ({ message, nickname, timestamp }) => {
  const db = await connection();

  await db.collection(COLLECTION).insertOne({ message, nickname, timestamp });

  return true;
};
