const connection = require('./connection');

const addMsg = async (payload) => connection()
  .then((db) => db.collection('messages').insertOne(payload));

const getMsg = async () => connection()
  .then((db) => db.collection('messages').find().toArray());

module.exports = {
  addMsg,
  getMsg,
};
