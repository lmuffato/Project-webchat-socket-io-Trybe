module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`New connection. Id: ${socket.id}`);

    socket.on('message', ({ chatMessage, nickname }) => {
      io.emit('message', chatMessage);
    });
  });
};
