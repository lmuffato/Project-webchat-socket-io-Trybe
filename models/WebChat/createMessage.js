const moment = require('moment');
const mongoConnection = require('../connection');

const COLLECTION_NAME = 'messages';

module.exports = async ({ chatMessage, nickname }) => {
  const collection = await mongoConnection()
    .then((db) => db.collection(COLLECTION_NAME));
  
  const newDate = new Date();
  const timestamp = moment(newDate).format('YYYY-MM-DD HH:mm:ss');
  
  const { insertedId: _id } = await collection
    .insertOne({ message: chatMessage, nickname, timestamp });

  return {
    _id,
    nickname,
    message: chatMessage,
    timestamp,
  };
};