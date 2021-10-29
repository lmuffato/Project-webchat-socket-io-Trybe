const randomName = require('../utils/randomName');

module.exports = (io) =>
  io.use((socket, next) => {
    const { nickname } = socket;
    if (!nickname) {
      socket.nickname = randomName();
      return next();
    }
    next();
  });
