const moment = require('moment');

/*
obj message = {
  nickname,
  timestamp,
  chatMessage
}
 */

const ONLINE_USERS = 'online-users';

const messagesHistory = [];

const onlineUsers = [];

const findIndexOnlineUser = (socketId) => (
  onlineUsers.findIndex((user) => socketId === user.id)
);

const changeNickname = ({ newNickname, id }) => {
  const index = findIndexOnlineUser(id);
  onlineUsers[index].nickname = newNickname;
};

const messageBuilder = ({ nickname, chatMessage }) => {
  const timestamp = new Date();
  const message = `${moment(timestamp)
    .format('DD-MM-yyyy h:mm:ss a')} - ${nickname}: ${chatMessage}`;

  messagesHistory.push(message);

  return message;
};

const formatNickname = (nickname) => nickname.slice(0, 16);

module.exports = (io) => io.on('connection', (socket) => {
  const client = { nickname: formatNickname(socket.id), id: formatNickname(socket.id) };
  onlineUsers.push(client);
  socket.emit('clientInfo', client);
  socket.emit('messageHistory', messagesHistory);
  io.emit(ONLINE_USERS, onlineUsers);

  socket.on('message', async (clientInfo) => io.emit('message', messageBuilder(clientInfo)));

  socket.on('changeNickname', (nickInfo) => {
    console.log(onlineUsers);
    changeNickname(nickInfo);
    console.log(onlineUsers);
    io.emit(ONLINE_USERS, onlineUsers);
    socket.emit('clientInfo', { nickname: nickInfo.newNickname, id: nickInfo.id });
  });

  socket.on('disconnect', () => {
    const index = findIndexOnlineUser(formatNickname(socket.id));
    onlineUsers.splice(index, 1);
    io.emit(ONLINE_USERS, onlineUsers);
  });
});