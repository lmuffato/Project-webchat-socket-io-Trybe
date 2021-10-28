const time = () => {
  const now = new Date();
  const date = `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}`;
  const hour = `${now.getHours()}-${now.getMinutes()}`;
  const msgTime = `${date} ${hour}`;
  return msgTime;
};

module.exports = (io) => io.on('connection', async (socket) => {
  time();
  socket.on('message', async ({ msg, nick }) => {
    io.emit('message', `${time()} - ${nick}: ${msg}`);
  });
});
