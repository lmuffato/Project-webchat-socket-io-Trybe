const { ObjectId } = require('bson');
const connection = require('./connection');

const COLLECTION = 'onlineUsers';

const create = async ({ nickname }) => {
  const collection = await connection()
    .then((db) => db.collection(COLLECTION));

  const { insertedId: id } = await collection
    .insertOne({ nickname });

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

const update = async (id, { nickname }) => {
  const collection = await connection()
  .then((db) => db.collection(COLLECTION));

  const response = await collection.updateOne(
    { _id: new ObjectId(JSON.parse(id)) },
    { $set: { nickname } },
  );

  return response;
};

const deleteById = async (id) => {
  const collection = await connection()
  .then((db) => db.collection(COLLECTION));

  // const response = await collection.deleteMany({}); // gambiarra para limpar tudo

  const response = await collection.deleteOne({ _id: new ObjectId(JSON.parse(id)) });

  return response;
};

module.exports = {
  create,
  getAll,
  update,
  deleteById,
};