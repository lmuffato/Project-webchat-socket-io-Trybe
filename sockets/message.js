module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`New connection. Id: ${socket.id}`);

    socket.on('message', ({ chatMessage, nickname }) => {
      const message = `(09-10-2020 2:35:09 PM) ${nickname}: ${chatMessage}`;
      io.emit('message', message);
    });
  });
};
