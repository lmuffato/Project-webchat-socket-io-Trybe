const connection = require('./connection');

const create = async (data) => {
  const db = await connection();
  const result = await db.collection('messages').insertOne({ ...data });
  return { id: result.insertedId, ...data };
};

const getAll = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find().toArray();
  return messages;
};

module.exports = {
  create,
  getAll,
};