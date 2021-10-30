const connection = require('./connection');

const saveMessage = async ({ timestamp, nickname, chatMessage }) => {
  const db = await connection();
  const result = await db.collection('messages')
  .insertOne({ timestamp, nickname, chatMessage });
  return result;
};
const getAllChatMessages = async () => {
  const db = await connection();
  const result = await db.collection('messages').find().toArray();
  // console.log(result, 'modeeel');
  return result;
};

module.exports = {
  saveMessage,
  getAllChatMessages,
}; 