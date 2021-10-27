const userModel = require('../models/userModel');
const chatModel = require('../models/chatModel');
// const { io } = require('socket.io-client');

const login = (io, socket) => {
  const random1 = (Math.random() * 9).toFixed(0);
  const random2 = (Math.random() * 9).toFixed(0);
  const username = `usuarioAnonimo${random1}${random2}`;
  const userId = userModel.create({ nickname: username, socketId: socket.id });
  const userList = userModel.getAll();
  socket.emit('login', { userList, userId, username });
  io.emit('usernameList', userList);
};

const updateUsername = (io, { userId, newUsername }) => {
  userModel.update(userId, { nickname: newUsername });
  const UserList = userModel.getAll();
  io.emit('usernameList', UserList);
};

const messageCreator = async (io, message) => {
  const { chatMessage, nickname } = message;
  const date = new Date();
  const timestamp = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()
  } ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const newMessage = `${nickname}@${timestamp}: ${chatMessage}`;
  await chatModel.create({ chatMessage, nickname, timestamp });
  io.emit('message', newMessage);
};

const end = (io, socketId) => {
  userModel.deleteById(socketId);
  const UserList = userModel.getAll();
  io.emit('usernameList', UserList);
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('login', () => {
      login(io, socket);
    });

    socket.on('updateUsername', ({ userId, newUsername }) => {
      updateUsername(io, { userId, newUsername });
    });
  
    socket.on('message', async (message) => {
      await messageCreator(io, message);
    });
    socket.on('disconnect', () => {
      end(io, socket.id);
    });
  });
};