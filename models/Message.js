const connection = require('./connection');

const COLLECTION = 'messages';

exports.getAll = async () => {
  const db = await connection();

  const messages = db.collection(COLLECTION).find().toArray();

  return messages;
};
