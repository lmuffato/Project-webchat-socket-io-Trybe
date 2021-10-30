const usersOnline = [];

module.exports = (io) => io.on('connection', 
/**
 * @param {import('socket.io').Socket} socket
 */
(socket) => {
  socket.emit('usersOnline', usersOnline);
  socket.on('disconnect', () => {
    const loggoutUserIndex = usersOnline.indexOf(socket.id);
    usersOnline.splice(loggoutUserIndex, 1);
    io.emit('usersOnline', usersOnline);
  });
  socket.on('listUser', (user) => {
    usersOnline.push(user);
    socket.emit('listUser', user);
    socket.broadcast.emit('listUser', user);
  });
});