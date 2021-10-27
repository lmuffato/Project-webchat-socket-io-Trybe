const connection = require('./connection');

const insertOne = async (obj) => {
    const db = await connection();
    await db.collection('messages').insertOne(obj);
};

module.exports = insertOne;