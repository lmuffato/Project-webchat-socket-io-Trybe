const usersOnline = [];

module.exports = (io) => io.on('connection', 
/**
 * @param {import('socket.io').Socket} socket
 */
(socket) => {
  socket.emit('usersOnline', usersOnline);
  // socket.disconnect(0);
  socket.on('disconnectUser', (user) => {
    const loggoutUserIndex = usersOnline.indexOf(user);
    usersOnline.splice(loggoutUserIndex, 1);
    socket.broadcast.emit('disconnectUser', user);
  });
  socket.on('listUser', (user) => {
    usersOnline.push(user);
    socket.emit('listUser', user);
    socket.broadcast.emit('listUser', user);
  });
});