const connection = require('./connection');

const getAll = async () => {
    const db = await connection();
    const allMessages = await db.collection('messages').find().toArray();
    return allMessages;
};

const create = async (message) => {
  const { timestamp, chatMessage, nickname } = message;
  const db = await connection();
  const newMessage = await db
  .collection('messages').insertOne({ timestamp, chatMessage, nickname });
  console.log('NEW MESSAGE DO MODEL', newMessage.ops[0]);
  return newMessage.ops[0];
};

module.exports = {
  getAll,
  create,
};