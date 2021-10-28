// const { ObjectId } = require('mongodb');
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

const getAllMessages = async () => {
  const getAll = await getConnection()
  .then((db) => db.collection('messages').find().toArray()); 

  if (!getAll.length) return { error: true };
  return getAll;
};

module.exports = {
  // saveMessages,
  getAllMessages,
};
