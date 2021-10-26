module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`New connection. Id: ${socket.id}`);

    socket.on('message', (message) => {
      io.emit('message', message);
    });
  });
};
