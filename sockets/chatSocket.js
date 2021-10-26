module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', (msg) => {
      socket.broadcast.emit('message', msg);
    });
  });
};
