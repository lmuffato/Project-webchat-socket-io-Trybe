const connect = require('./connection');

module.exports = {
  async create({ message, nickname, timestamp }) {
    const db = await connect();
    const messageInserted = await db.collection('messages').insertOne({
      message,
      nickname,
      timestamp,
    });
    return messageInserted;
  },

  async get() {
    const db = await connect();
    const messages = await db.collection('messages').find({}).toArray();
    return messages;
  },
};
