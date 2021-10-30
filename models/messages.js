const getConnection = require('./connection');

const formatDataOfDbToSend = (arrayMessages) => arrayMessages.map((message) => {
    const oldMessages = `${message.timestamp} - ${message.nickname}: ${message.message}`;
    return oldMessages;
  });

const getAllMessages = async () => {
  const getAll = await getConnection()
  .then((db) => db.collection('messages').find().toArray()); 

  if (!getAll.length) return { error: true };

  const allOldMessagesFormated = formatDataOfDbToSend(getAll);

  return allOldMessagesFormated;
};

const saveMessages = async (dataMessage) => {
  const usersCollection = await getConnection()
    .then((db) => db.collection('messages'));
    
    await usersCollection.insertOne(dataMessage);
};

module.exports = {
  getAllMessages,
  saveMessages,
};
