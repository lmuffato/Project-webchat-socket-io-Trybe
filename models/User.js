const connection = require('./connection');

const getAll = async () => {
  const db = await connection();

  const user = await db.collection('user').find().toArray();

  return user;
};

const newMessage = async (chatMessage, nickname) => {
    const db = await connection();
    const addMessage = await db.collection('messages')
    .insert({ chatMessage, nickname, date: Date() });
    console.log(addMessage);
    return addMessage;
};

module.exports = {
  getAll,
  newMessage,
};
