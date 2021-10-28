const moment = require('moment');
const connection = require('./connection');

const storeMessage = async (message, nickname) => {
  const db = await connection();
  const storedMessage = await db.collection('messages').insertOne(
    { message, nickname, timestamp: new Date() },
  );
  
  return storedMessage;
};

const formatMessage = (message, nickname, _date) => {
  const formatedDate = moment().format('DD-MM-yyyy HH:mm:ss a');
  return `${formatedDate} ${nickname} ${message}`;
};

const getAllMessages = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find().toArray();

  return messages.map(({ message, nickname, timestamp }) =>
    formatMessage(message, nickname, timestamp));
};

module.exports = {
  storeMessage,
  formatMessage,
  getAllMessages,
};
