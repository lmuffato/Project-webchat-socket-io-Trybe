module.exports = (io) => io.on('connection', async (socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    io.emit('message', `${nickname}: ${chatMessage}`);
  });
});
