const connect = require('./connection');

const create = async (contentMessage, time, nick) => {
  const db = await connect();
  const message = await db
  .collection('messages').insertOne({ contentMessage, time, nick });
  return message;
};

const getAll = async () => {
  const db = await connect();
  const messages = await db.collection('messages').find().toArray();
  return messages;
};

module.exports = {
  create,
  getAll,
};
