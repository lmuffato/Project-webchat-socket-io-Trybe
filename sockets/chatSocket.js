module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', () => { });
  });
};
