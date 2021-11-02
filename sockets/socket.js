const {
  getNickName,
  getMessageRes,
  addUser,
  kickUser,
  nickNameList,
 } = require('./utils');

let activeUsers = [];

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`Usuário ${socket.id} acabou de entrar`);

  activeUsers = [...addUser(activeUsers, socket.id)];

  socket.emit('myNick', getNickName(activeUsers, socket.id));

  io.emit('activeClients', nickNameList(activeUsers));

  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit('message', getMessageRes(nickname, chatMessage));
  });

  socket.on('disconnect', () => {
    activeUsers = kickUser(activeUsers, socket.id);

    io.emit('activeClients', nickNameList(activeUsers));
  });
});
