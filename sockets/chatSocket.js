const hourDate = () => {
  const date = new Date();
  const dmy = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  const hourMinS = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return `${dmy} ${hourMinS}`;
};

module.exports = (io) => io.on('connection', async (socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    io.emit('message', `${hourDate()} - ${nickname}: ${chatMessage}`);
  });
});
