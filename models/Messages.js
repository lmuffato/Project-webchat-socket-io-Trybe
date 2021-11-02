const connection = require('./connection');

const createNewMessage = async ({ id, chatMessage, nickname, timestamp }) => {
  const db = await connection();
  db.collection('messages')
    .insertOne({ 
      id, 
      message: chatMessage, 
      nickname, 
      timestamp, 
    });
};

const getMessages = async () => connection()
  .then((db) => db.collection('messages')
  .find({})
  .toArray());

const updateMessage = async (id, nickname) => connection()
  .then((db) => db.collection('messages')
  .findOneAndUpdate(
    { id },
    { $set: { nickname } },
  ));

module.exports = {
  createNewMessage,
  getMessages,
  updateMessage,
};
