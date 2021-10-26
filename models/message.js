const connection = require('./connection');

const create = async (data) => {
  const db = await connection();
  const result = await db.collection('messages').insertOne({ ...data });
  return { id: result.insertedId, ...data };
};

module.exports = {
  create,
};