const mongoConnection = require('../connection');

const COLLECTION_NAME = 'messages';

module.exports = async () => {
  const collection = await mongoConnection()
    .then((db) => db.collection(COLLECTION_NAME));
  
  const messages = await collection.find().toArray();

  return messages;
};