const connection = require('./connection');

const addMessage = async (msgData) => {
    const db = await connection();
    await db.collection('messages').insertOne({ ...msgData });
};

const getMessages = async () => {
    const db = await connection();
    return db.collection('messages').find().toArray();
};

module.exports = { addMessage, getMessages };