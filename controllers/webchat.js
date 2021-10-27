module.exports = (io) => io.on('connection', async (socket) => {
  socket.on('message', async ({ msg, nick }) => {
    io.emit('message', `${nick}: ${msg}`);
  });
});
