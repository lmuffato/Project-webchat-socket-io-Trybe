const moment = require('moment');
const WebChat = require('../models/WebChat');

const usersOnline = [];

const createUser = (socket) => {
  const { id } = socket;
  const [newNickname] = id.match(/[\w'-]{16}/g);
  usersOnline.push({ id, nickname: newNickname });
  socket.emit('newUser', newNickname);
};

const getMessages = async (socket) => {
  const messages = await WebChat.getAllMessages();
  socket.emit('getMessages', messages);
};

const sendNewMessage = (socket, io) => {
  const timestamp = moment().format('DD-MM-YYYY h:mm:ss A');
  socket.on('message', async ({ chatMessage, nickname }) => {
    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
    await WebChat.createNewMessage({ message: chatMessage, nickname, timestamp });
  });
};

const updateUsersOnline = (socket, io) => {
  socket.on('updateUserList', () => {
    io.emit('updateUserList', usersOnline);
  });
};

const setNewNickname = (socket, io) => {
  socket.on('setNewNickname', (newNick) => {
    const userIndex = usersOnline.findIndex((user) => user.id === socket.id);
    usersOnline[userIndex].nickname = newNick;
    io.emit('updateUserList', usersOnline);
  });
};

const disconnectUser = (socket, io) => {
  socket.on('disconnect', () => {
    const userIndex = usersOnline.findIndex((user) => user.id === socket.id);
    usersOnline.splice(userIndex, 1);
    io.emit('updateUserList', usersOnline);
  });
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    createUser(socket);
    getMessages(socket);
    sendNewMessage(socket, io);
    updateUsersOnline(socket, io);
    setNewNickname(socket, io);
    disconnectUser(socket, io);
  });
};
