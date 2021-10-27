const randomName = require('../utils/randomName');

module.exports = (io) =>
  io.use((socket, next) => {
    const { username } = socket.handshake.auth;
    if (!username) {
      socket.username = randomName();
      return next();
    }
    socket.username = username;
    next();
  });
