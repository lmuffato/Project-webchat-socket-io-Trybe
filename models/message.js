const moment = require('moment');
const connection = require('./connection');

const formatMessages = (messages) => messages.map(({ nickname, chatMessage, timestamp }) => (
  `${moment(timestamp).format('DD-MM-yyyy h:mm:ss a')} - ${nickname}: ${chatMessage}`
  ));

const getAllMessages = async () => {
  const db = await connection();

  const messages = await db.collection('messages').find({}).toArray();

  return formatMessages(messages);
};

const create = async (message) => {
  const db = await connection();
  const result = await db.collection('messages').insertOne(message);

  return { message: result.ops[0] };
};

module.exports = { getAllMessages, create };