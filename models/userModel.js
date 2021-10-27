// // const { ObjectId } = require('bson');
// const connection = require('./connection');

// // const COLLECTION = 'onlineUsers';

// // const create = async ({ nickname }) => {
// //   const collection = await connection()
// //     .then((db) => db.collection(COLLECTION));

// //   const { insertedId: id } = await collection
// //     .insertOne({ nickname });

// //   return {
// //     id,
// //   };
// // };

// // const getAll = async () => {
// //   const collection = await connection()
// //   .then((db) => db.collection(COLLECTION));

// //   const response = await collection.find().toArray();

// //   return response;
// // };

// // const update = async (id, { nickname }) => {
// //   const collection = await connection()
// //   .then((db) => db.collection(COLLECTION));

// //   const response = await collection.updateOne(
// //     { _id: new ObjectId(JSON.parse(id)) },
// //     { $set: { nickname } },
// //   );

// //   return response;
// // };

//   const deleteById = async (id) => {
//     // const collection = await connection()
//     // .then((db) => db.collection(COLLECTION));

//     const collectionChat = await connection()// gambiarra para limpar as Mensagens junto
//     .then((db) => db.collection('messages'));// gambiarra para limpar as Mensagens junto

//     await collectionChat.deleteMany({}); // gambiarra para limpar as Mensagens junto
//     // const response = await collection.deleteMany({}); // gambiarra para limpar tudo

//     // const response = await collection.deleteOne({ _id: new ObjectId(JSON.parse(id)) });

//     // return response;
//   };

// // module.exports = {
// //   create,
// //   getAll,
// //   update,
// //   deleteById,
// // };

let ARRAYdaMASSA = [];

const create = ({ nickname, socketId }) => {
  let id;
  if (ARRAYdaMASSA.length === 0) {
    id = 1;
  } else {
    const lastId = ARRAYdaMASSA[ARRAYdaMASSA.length - 1].id;
    id = lastId + 1;
  }
  const clientObj = { id, nickname, socketId };

  ARRAYdaMASSA.push(clientObj);

  return { id };
};

const getAll = () => ARRAYdaMASSA;

const update = (id, { nickname }) => {
  const newArray = ARRAYdaMASSA.map((user) => {
    if (user.id === parseInt(id, 0)) {
      const newUser = { id: parseInt(id, 0), nickname, socketId: user.socketId };
      return newUser;
    }
     return user;
  });
  ARRAYdaMASSA = newArray;
  return 'ok';
};

const deleteById = async (socketId) => {
  const newArray = ARRAYdaMASSA.filter((user) => user.socketId !== `${socketId}`);
  console.log(ARRAYdaMASSA);
  console.log(newArray);
  ARRAYdaMASSA = [];
  return 'ok';
};

module.exports = {
  create,
  getAll,
  update,
  deleteById,
};