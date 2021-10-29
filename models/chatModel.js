const connection = require('./connection');

const getAll = () => connection().then(
  (db) => db.collection('messages').find({}).toArray(),
);

const saveMsgModel = (message) => connection().then(
  (db) => db.collection('messages').insertOne(message),
);

module.exports = {
  getAll,
  saveMsgModel,
};