// const { ObjectId } = require('mongodb');
const { map } = require('lodash');
const getConnection = require('./connection');

// const saveMessages = async () => {
//   const { _id } = payload;
//   const userId = _id;
//   const usersCollection = await getConnection()
//     .then((db) => db.collection('messages'));

//   const inserted = await usersCollection.insertOne({ name, ingredients, preparation, userId })
//     .then((res) => res.ops[0]);

//   if (!inserted.name) return { error: true };
//   return { recipe: inserted };
// };

const formatDataOfDbToSend = (arrayMessages) => {
  return arrayMessages.map((message) => {
    const oldMessages = `${message.timestamp} - ${message.nickname}: ${message.message}`;
    return oldMessages;
  });
};

const getAllMessages = async () => {
  const getAll = await getConnection()
  .then((db) => db.collection('messages').find().toArray()); 

  if (!getAll.length) return { error: true };

  const allOldMessagesFormated = formatDataOfDbToSend(getAll);

  console.log(allOldMessagesFormated, 'aaaaaaaaaaaaaaaaaaaa');

  return allOldMessagesFormated;
};

module.exports = {
  // saveMessages,
  getAllMessages,
};
