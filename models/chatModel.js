// const { ObjectID } = require('mongodb');
const connection = require('./connection');

const getAllMessages = async () => {
  const db = await connection();
  const allMessages = await db.collection(process.env.DB_NAME).find().toArray();
  return allMessages;
};

const saveMessage = async ({ message, nickname, timestamp }) => {
  const db = await connection();
  await db.collection(process.env.DB_NAME).insertOne({ message, nickname, timestamp });
};

// getById = async (id) => {
//   const db = await connection();

//   const product = await db.collection('products').findOne({ _id: ObjectID(id) });

//   return product;
// };

// addBid = async (_id) => {
//   const db = await connection();

//   const products = await db.collection('products').updateOne({ _id: ObjectID(_id), }, { $inc: { lanceAtual: 5 }});

//   return true;
// };

module.exports = {
  saveMessage,
  getAllMessages,
};
