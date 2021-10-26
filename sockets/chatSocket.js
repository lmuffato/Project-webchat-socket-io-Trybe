module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', (msg) => {
      io.broadcast.emit('serverMessage', msg);
    });
  });
};
