// const { ObjectID } = require('mongodb');
const connection = require('./connection');

const getAllMessages = async () => {
  const db = await connection();
  const allMessages = await db.collection('messages').find().toArray();
  return allMessages;
};

const saveMessage = async ({ message, nickname, timestamp }) => {
  const db = await connection();
  await db.collection('messages').insertOne({ message, nickname, timestamp });
};

module.exports = {
  saveMessage,
  getAllMessages,
};
