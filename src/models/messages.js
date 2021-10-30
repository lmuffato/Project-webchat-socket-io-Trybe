const connection = require('./connection');

const collectionName = 'messages';

const getAll = async () => {
  const messages = await connection()
    .then((db) => db.collection(collectionName).find({}, { projection: { _id: 0 } }).toArray())
    .catch((err) => console.log(err));
  return messages;
};

const create = async ({ message, nickname, timeStamp }) => {
  const db = await connection();
  await db.collection(collectionName)
    .insertOne({ message, nickname, timeStamp })
    .then((result) => (console.log(`message saved on id ${result.insertedId}`)))
    .catch((err) => console.log(err));
};

module.exports = { getAll, create };