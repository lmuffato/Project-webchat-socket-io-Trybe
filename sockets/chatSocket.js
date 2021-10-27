const hourDate = () => {
  const date = new Date();
  const dmy = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  const hourMinS = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return `${dmy} ${hourMinS}`;
};

const onlineUsers = {};

module.exports = (io) => io.on('connection', async (socket) => {
  onlineUsers[socket.id] = `Anonimo-${socket.id.slice(0, 8)}`;
  io.emit('updateOlineList', onlineUsers);

  socket.on('message', async ({ chatMessage, nickname }) => {
    io.emit('message', `${hourDate()} - ${nickname}: ${chatMessage}`);
  });

  socket.on('updateName', ({ nick, id }) => { 
    onlineUsers[id] = nick; 
    io.emit('updateOlineList', onlineUsers);
  });

  socket.on('disconnect', () => {
    delete onlineUsers[socket.id];
    io.emit('updateOlineList', onlineUsers);
  });
});
