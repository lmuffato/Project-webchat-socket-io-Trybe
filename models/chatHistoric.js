const connection = require('./connection');

const addMessage = async ({ chatMessage, nickname, dateAndOur }) => {
  await connection()
    .then((db) => db
    .collection('messages')
    .insertOne({ chatMessage, nickname, dateAndOur }));
  return 'Ok';
};

const getMessages = async () => {
  const messages = await connection()
    .then((db) => db
    .collection('messages')
    .find({ }).toArray());
  return messages;
};

module.exports = {
  addMessage,
  getMessages,
};
