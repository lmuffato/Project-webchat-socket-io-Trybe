const { ObjectID } = require('mongodb');
const connection = require('./connection');

const COLLECTION_NAME = 'messages';

const getAllMessages = async () => {
  const chatMessages = await connection().then((db) => db
  .collection(COLLECTION_NAME).find({}).toArray()).then((res) => res)
  .catch((err) => console.log(err));

  return chatMessages;
};

const createMessage = async (data, timestamp) => {
  const { nickname, chatMessage } = data;
  const newChatMessage = await connection().then((db) => db
  .collection(COLLECTION_NAME)
  .insertOne({
    nickname,
    message: chatMessage,
    timestamp }))
  .then(() => `${timestamp} - ${nickname}: ${chatMessage}`)
  .catch((err) => console.log(err));

  return newChatMessage;
};

const excludeMessage = async (id) => {
  if (!ObjectID.isValid(id)) {
    return null;
  }

  const removeMessage = await connection().then((db) => db
  .collection(COLLECTION_NAME).deleteOne({ _id: ObjectID(id) }))
  .catch((err) => console.log(err));

  return removeMessage;
};

module.exports = {
  getAllMessages,
  createMessage,
  excludeMessage,
};
