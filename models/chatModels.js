const connection = require('./connection');

const addMsg = async (payload) => connection.getConnection()
  .then((db) => db.collection('messages').insertOne(payload));

const getMsg = async () => connection.getConnection()
  .then((db) => db.collection('messages').find());

module.exports = {
  addMsg,
  getMsg,
};
