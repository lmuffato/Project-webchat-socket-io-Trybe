const moment = require('moment');
const connection = require('./connection');

const createMessage = async ({ nickname, chatMessage: message }) => {
  const db = await connection();
  const result = await db
    .collection('messages')
    .insertOne({
      nickname,
      message,
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
    });
  return result;
};

const getMessages = async () => {
  const db = await connection();
  const result = await db.collection('messages').find().toArray();
  return result;
};

module.exports = { createMessage, getMessages };
