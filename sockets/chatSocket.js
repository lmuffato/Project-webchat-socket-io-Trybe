const userModel = require('../models/userModel');
const chatModel = require('../models/chatModel');

const updateUsername = (io, { userId, newUsername }) => {
  userModel.update(userId, { nickname: newUsername });
  const UserList = userModel.getAll();
  io.emit('usernameList', UserList);
};

const login = (io) => {
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

const end = (io, id) => {
  userModel.deleteById(id);
  const UserList = userModel.getAll();
  io.emit('usernameList', UserList);
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('updateUsername', ({ userId, newUsername }) => {
      updateUsername(io, { userId, newUsername });
    });
  
    socket.on('login', () => {
      login(io);
    });
  
    socket.on('message', async (message) => {
      await messageCreator(io, message);
    });

    socket.on('end', (id) => {
      end(io, id);
    });
  });
};