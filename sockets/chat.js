const moment = require('moment');
const messageModel = require('../models/message');

const ONLINE_USERS = 'online-users';

const onlineUsers = [];

const findIndexOnlineUser = (socketId) => (
  onlineUsers.findIndex((user) => socketId === user.id)
);

const changeNickname = ({ newNickname, id }) => {
  const index = findIndexOnlineUser(id);
  onlineUsers[index].nickname = newNickname;
};

const messageBuilder = async ({ nickname, chatMessage }) => {
  const timestamp = new Date();
  const message = `${moment(timestamp)
    .format('DD-MM-yyyy h:mm:ss a')} - ${nickname}: ${chatMessage}`;
  
  await messageModel.create({ nickname, chatMessage, timestamp });

  return message;
};

const formatNickname = (nickname) => nickname.slice(0, 16);

module.exports = (io) => io.on('connection', (socket) => {
  const client = { nickname: formatNickname(socket.id), id: formatNickname(socket.id) };
  onlineUsers.push(client);
  socket.emit('clientInfo', client);
  io.emit(ONLINE_USERS, onlineUsers);

  socket.on('message', async (clientInfo) => io.emit('message', await messageBuilder(clientInfo)));

  socket.on('changeNickname', (nickInfo) => {
    changeNickname(nickInfo);
    io.emit(ONLINE_USERS, onlineUsers);
    socket.emit('clientInfo', { nickname: nickInfo.newNickname, id: nickInfo.id });
  });

  socket.on('disconnect', () => {
    const index = findIndexOnlineUser(formatNickname(socket.id));
    onlineUsers.splice(index, 1);
    io.emit(ONLINE_USERS, onlineUsers);
  });
});