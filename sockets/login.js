  module.exports = (io, socket, randomName, usersOn) => {
    const users = usersOn;
    users[socket.id] = randomName;
    io.emit('nickname', randomName);
    io.emit('login', users);
  };