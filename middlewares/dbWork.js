const mongoConnection = require('../models/connection');

const saveToDb = async (msgToSend) => {
  const connection = await mongoConnection();
  await connection.collection('messages').insertOne({ msgToSend });
};

const getAll = async () => {
  const connection = await mongoConnection();
  const result = await connection.collection('messages').find({}).toArray();

  return result;
};

module.exports = {
  saveToDb,
  getAll,
};
