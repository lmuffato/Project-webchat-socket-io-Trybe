const connection = require('./connection');

const getHistory = async () => {
  const db = await connection();
  const history = await db.collection('messages').find().toArray();
  return history;
};

module.exports = {
  getHistory,
};