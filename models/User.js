const connection = require('./connection');

const updateNick = async (newNick, nickname) => {
  const db = await connection();

  const user = await db.collection('user').update({ nickname }, { $set: { nickname: newNick } });

  return user;
};

const newMessage = async (chatMessage, nickname) => {
    const db = await connection();
    const addMessage = await db.collection('user')
    .insert({ chatMessage, nickname, date: Date() });
    return addMessage;
};

module.exports = {
  updateNick,
  newMessage,
};
