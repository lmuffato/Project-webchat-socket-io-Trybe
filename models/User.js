const moment = require('moment');

const connection = require('./connection');

const getAllMessages = async () => {
  const db = await connection();

  const messages = await db.collection('messages').find({}).toArray();
  
  return messages;
};

const newMessage = async (chatMessage, nickname) => {
    const db = await connection();
    const addMessage = await db.collection('messages')
    .insertOne({ chatMessage, nickname, date: moment().format('DD-MM-yyyy HH:mm:ss A') });
    return addMessage;
};

module.exports = {
  getAllMessages,
  newMessage,
};
