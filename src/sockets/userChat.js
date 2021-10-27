let onlineUsers = [];

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('updateName', (nickname) => {
    onlineUsers = onlineUsers.concat(nickname);
    io.emit('updateUserlist', onlineUsers);
  });
  socket.on('disconnect', () => {
    
    socket.broadcast.emit('serverMessage', `Xiii! ${socket.id} acabou de se desconectar! :(`);
  });

});