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
  const name = socketId.split('')
    .splice(socketId.length - 16)
    .join('');
  return name;
};

let realName;

const createText = (nickname, socketId, chatMessage) => {
  const date = getCurrentDate();
  if (!nickname) { realName = createNameFromId(socketId); } else { realName = nickname; }
  return (`${date} - ${realName}: ${chatMessage}`);
};

module.exports = (io) => io.on('connection', (socket) => {
  io.emit('new-connection', createNameFromId(socket.id));
  socket.on('save-user', (nickname) => io.emit('new-user', nickname));
  socket.on('message', async ({ chatMessage, nickname }) => {
    io.emit('message', createText(nickname, socket.id, chatMessage));
    await chatController.createMessage({
      message: chatMessage, nickname: realName, timestamp: getCurrentDate(),
    });
  });
});