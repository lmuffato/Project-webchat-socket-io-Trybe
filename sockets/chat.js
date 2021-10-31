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

const createNameFromId = (socketId) => {
  const nameArray = socketId.split('')
    .splice(socketId.length - 16)
    .join('');
  return nameArray;
};

module.exports = (io) => io.on('connection', (socket) => {
  io.emit('new-connection', createNameFromId(socket.id));

  socket.on('save-user', (nickname) => {
    teste = nickname;
    io.emit('new-user', nickname);
  });

  socket.on('message', ({ chatMessage, nickname }) => {
    const date = getCurrentDate();
    io.emit('message', `${date} - ${!nickname 
      ? createNameFromId(socket.id) : nickname}: ${chatMessage}`);
  });
});