const connection = require('./connection');

const insertMessage = async ({ id, chatMessage, nickname, timestamp }) => {
  const db = await connection();
  db.collection('messages')
    .insertOne({ id, message: chatMessage, nickname, timestamp });
};

const findAll = async () => connection().then((db) => db.collection('messages').find({}).toArray());

const updateNickname = async (id, nickname) => connection().then((db) => db.collection('messages')
  .findOneAndUpdate(
    { id },
    { $set: { nickname } },
  ));

module.exports = {
  insertMessage,
  findAll,
  updateNickname,
};
