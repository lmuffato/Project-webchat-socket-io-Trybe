module.exports = (socket, io, usersOn) => {
  const users = usersOn;
socket.on('disconnect', () => {
  socket.broadcast.emit('message', `Usuário ${socket.id} acabou de se desconectar! :(`);
  delete users[socket.id]; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
  io.emit('login', users);
});
};