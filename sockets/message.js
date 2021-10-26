module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`New connection. Id: ${socket.id}`);

    socket.on('message', ({ chatMessage, nickname }) => {
      const dateStr = new Date().toLocaleString('en-GB').replace(/\//g, '-');
      const message = `(${dateStr}) ${nickname}: ${chatMessage}`;
      io.emit('message', message);
    });
  });
};
