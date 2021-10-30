const connection = require('./connection');

const createNewMessageDocument = async (message, nickname, timestamp) => {
   const db = await connection();

       await db.collection('messages').insertOne({ message, nickname, timestamp });
};

const getAll = async () => {
    const db = await connection();
    const messages = await db.collection('messages').find().toArray();
    return messages;
};
 
module.exports = {
    createNewMessageDocument,
    getAll,
};