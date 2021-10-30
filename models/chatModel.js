const connection = require('./connection');

const createMsg = async (msg) => connection()
  .then((db) => db.collection('messages').insertOne(msg));

const getMsg = async () => connection()
  .then((db) => db.collection('messages').find().toArray());

module.exports = {
  createMsg,
  getMsg,
};
