const connection = require('./connection');

const formatMessage = (msgObj) => {
  const arrayMessages = msgObj.map((message) => (
    `${message.timestamp} - ${message.nickname}: ${message.message}`));
  return arrayMessages;
};

const getAllMessages = async () => {
  const db = await connection();
  const msgs = await db.collection('messages').find().toArray();
  return formatMessage(msgs);
};

const createMessage = async (msg) => {
  const { message, nickname, timestamp } = msg;
  const db = await connection();
  const newMessage = await db.collection('messages').insertOne({ message, nickname, timestamp });
  return newMessage;
};

module.exports = { getAllMessages, createMessage };
