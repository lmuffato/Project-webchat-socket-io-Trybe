const connection = require('./connection');

const getAllMessages = () => connection().then((db) => {
    db.collection('messages').find({}).toArray();
  });

const sendMessage = (message) => connection().then((db) => {
  db.collection('messages').insertOne({ message });
});

module.exports = {
  getAllMessages,
  sendMessage,
};