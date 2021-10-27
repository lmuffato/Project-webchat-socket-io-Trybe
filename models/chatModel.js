const connection = require('./connection');

const COLLECTION = 'messages';

const create = async ({ chatMessage, nickname, timestamp }) => {
  const collection = await connection()
    .then((db) => db.collection(COLLECTION));

  const { insertedId: id } = await collection
    .insertOne({ chatMessage, nickname, timestamp });

  return {
    id,
  };
};

const getAll = async () => {
  const collection = await connection()
  .then((db) => db.collection(COLLECTION));

  const response = await collection.find().toArray();

  return response;
};

module.exports = {
  create,
  getAll,
};