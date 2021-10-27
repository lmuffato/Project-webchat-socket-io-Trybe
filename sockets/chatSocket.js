const userModel = require('../models/userModel');
const chatModel = require('../models/chatModel');

const updateUsername = async (io, { userId, newUsername }) => {
  await userModel.update(userId, { nickname: newUsername });
  const UserList = await userModel.getAll();
  io.emit('usernameList', UserList);
};

const login = async (io) => {
  const UserList = await userModel.getAll();
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

const end = async (io, id) => {
  await userModel.deleteById(id);
  const UserList = await userModel.getAll();
  io.emit('usernameList', UserList);
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('updateUsername', async ({ userId, newUsername }) => {
      await updateUsername(io, { userId, newUsername });
    });
  
    socket.on('login', async () => {
      await login(io);
    });
  
    socket.on('message', (message) => {
      messageCreator(io, message);
    });
    socket.on('end', async (id) => {
      await end(io, id);
    });
  });
};