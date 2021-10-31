const usersOnline = [];

function disconnect(io, userName) {
  const loggoutUserIndex = usersOnline.indexOf(userName);
  usersOnline.splice(loggoutUserIndex, 1);
  io.emit('usersOnline', usersOnline);
}

module.exports = (io) =>
  io.on(
    'connection',
    /**
     * @param {import('socket.io').Socket} socket
     */
    (socket) => {
      let userName;
      socket.on('listUser', (user) => {
        userName = user;
        usersOnline.push(user);
        io.emit('listUser', user);
      });
      socket.emit('usersOnline', usersOnline);
      socket.on('changeUserName', (newName) => {
        const changingName = usersOnline.indexOf(userName);
        usersOnline[changingName] = newName;
        io.emit('changeUserName', [userName, newName]);
        userName = newName;
      });
      socket.on('disconnect', () => disconnect(io, userName));
    },
  );
