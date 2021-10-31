const chatController = require('../controllers/chat');

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
    io.emit('new-user', nickname);
  });
  socket.on('message', async ({ chatMessage, nickname }) => {
    const date = getCurrentDate();
    let realName;
    if (!nickname) { realName = createNameFromId(socket.id); } else { realName = nickname; }
    io.emit('message', `${date} - ${realName}: ${chatMessage}`);
    await chatController.createMessage({
      message: chatMessage, nickname: realName, timestamp: date,
    });
  });
});