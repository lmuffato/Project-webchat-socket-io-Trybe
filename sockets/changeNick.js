module.exports = (io, socket) =>
  socket.on('changeNick', (nickname) => {
    socket.prevNick = socket.nickname;
    socket.nickname = nickname;
    socket.emit('changeNick', socket.nickname);
    socket.broadcast.emit('serverMessage', {
      message: `${socket.prevNick} mudou para ${socket.nickname}.`,
    });
  });
