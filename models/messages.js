const connection = require('./connection');

const saveMessage = async ({ timestamp, nickname, chatMessage }) => connection()
.then((db) => db.collection('messages')
.insertOne({ timestamp, nickname, chatMessage }));

const getAllMessages = async () => connection().then((db) => db.collection('messages')
.find()
.toArray());

module.exports = {
  saveMessage,
  getAllMessages,
}; 