const time = () => {
  const now = new Date();
  const date = `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}`;
  const hour = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  const msgTime = `${date} ${hour}`;
  return msgTime;
};

const chatModel = require('../models/webchat');

const onlineUsers = {};

const getAll = async () => {
  const messages = await chatModel.getAll();
  return messages;
};

const getNickname = (arr, userId) => {
  const online = Object.entries(arr);
  const search = online.map((e) => (e[0] === userId ? e[1] : false));
  return search[0];
};

module.exports = (io) => io.on('connection', async (socket) => {
  const randomId = socket.id.substr(0, 16);
  socket.emit('userOnline', randomId);
  io.emit('chatHistory', await getAll());
  socket.on('changeNickname', (newNickname) => {
    onlineUsers[socket.id] = newNickname;
    io.emit('userOnline', onlineUsers[socket.id]);
  });
  
  socket.on('message', async ({ chatMessage, nickname }) => {
    const nick = getNickname(onlineUsers, socket.id);
    const newMessage = {
      chat: chatMessage,
      name: `${nick || nickname}`,
      timestamp: time(),
    };
    chatModel.create(newMessage);
    io.emit('message', `${time()} - ${nick || nickname}: ${chatMessage}`);
  });
});
