const chatModel = require('../models/chat');
const chatUtils = require('../utils/chat');

const chat = async (_req, res) => {
  const messagesData = await chatModel.getMessages();
  
  const messages = messagesData.map(({ timestamp, nickname, message }) => chatUtils
    .formatMessage(timestamp, nickname, message));

  res.status(200).render('index', { messages });
};

const connectedUsers = {};

const socketConnection = (io) => {
  io.on('connection', (socket) => {
    console.log('conectado:', socket.id);

    chatUtils.receiveMessage(socket, io, chatModel);

    socket.on('updateUser', (nickname) => {
      connectedUsers[socket.id] = nickname;
      chatUtils.sendConnectedUsers(io, connectedUsers);
    });

    socket.on('disconnect', () => {
      delete connectedUsers[socket.id];
      chatUtils.sendConnectedUsers(io, connectedUsers);
    });
  });
};

module.exports = {
  chat,
  socketConnection,
};
