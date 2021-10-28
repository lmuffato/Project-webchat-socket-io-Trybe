const connection = require('./connection');

const create = async (messageData) => {
  const db = await connection();
  await db.collection('messages').insertOne({ ...messageData });
}

const findAll = async () => {
  const db = await connection();
  const messages = db.collection('messages').find().toArray();
  return messages;
}

module.exports = {
  create,
  findAll,
}