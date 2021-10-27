const connection = require('./connection');

const find = async (obj = null) => {
    const db = await connection();
    return db.collection('messages').find(obj).toArray();
};

module.exports = find;