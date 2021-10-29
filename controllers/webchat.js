const time = () => {
  const now = new Date();
  const date = `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}`;
  const hour = `${now.getHours()}:${now.getMinutes()}`;
  const msgTime = `${date} ${hour}`;
  return msgTime;
};

const onlineUsers = {};

module.exports = (io) => io.on('connection', (socket) => {
  const randomId = socket.id.substr(0, 16);
  socket.emit('userOnline', randomId);
  socket.on('changeNickname', (newNickname) => {
    onlineUsers[socket.id] = newNickname;
    io.emit('userOnline', onlineUsers[socket.id]);
  });
  
  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit('message',
      `${time()} - ${onlineUsers[socket.id] ? onlineUsers[socket.id] : nickname}: ${chatMessage}`);
  });
});
