const moment = require('moment');
const connection = require('./connection');

const getAllMessages = async () => {
  const db = await connection();
  const chatMessages = await db.collection('messages').find({}).toArray();
  return chatMessages;
};

const chatMessages = async (chatInfo) => {
  const { nickname, chatMessage } = chatInfo;
  const timestamp = moment().format('DD-MM-yyyy, HH:mm:ss A');
  const db = await connection();
  await db.collection('messages').insertOne({
    nickname,
    message: chatMessage,
    timestamp,
  });
  return `${timestamp} - ${nickname}: ${chatMessage}`;
};

module.exports = {
  getAllMessages,
  chatMessages,
};