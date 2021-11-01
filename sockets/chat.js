const moment = require('moment');

/*
obj message = {
  nickname,
  timestamp,
  chatMessage
}
 */

const onlineUsers = [];

const findIndexOnlineUser = (socketId) => (
  onlineUsers.findIndex(({ id }) => socketId.slice(0, 16) === id)
);

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id} `);
  const nick = socket.id.slice(0, 16);
  onlineUsers.push({ nickname: nick, id: nick });

  io.emit('online-users', onlineUsers);

  socket.on('message', async (data) => {
    const { nickname, chatMessage } = data;
    const timestamp = new Date();

    io.emit('message', `${moment(timestamp)
      .format('DD-MM-yyyy h:mm:ss a')} - ${nickname}: ${chatMessage}`);
  });

  socket.on('disconnect', () => {
    console.log(`usuário ${socket.id} desconectado`);
    const index = findIndexOnlineUser(socket.id);
    onlineUsers.splice(index, 1);

    io.emit('online-users', onlineUsers);
  });
});