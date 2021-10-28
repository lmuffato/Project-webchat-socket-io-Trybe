const getCurrentDate = () => {
  const today = new Date();
  const day = today.getDate();
  const month = Number(today.getMonth()) + 1;
  const year = today.getFullYear();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  return (
    `${day}-${month}-${year} ${hours}:${minutes}`
  );
};

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('save-user', (nickName) => {
    io.emit('new-user', { nickName });
  });

  socket.on('message', ({ chatMessage, nickname }) => {
    const date = getCurrentDate();
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
  });
});