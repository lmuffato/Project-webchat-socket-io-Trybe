const moment = require('moment');

const sentMessage = (nickname, chatMessage) => {
  const date = moment().format('L');
  const hours = moment().format('LTS');
  const fixedDate = `${date} ${hours}`;
  const formatedDate = fixedDate.replace(/\//g, '-'); 
  return `${formatedDate} - ${nickname}: ${chatMessage}`;
};

module.exports = (io) =>
  io.on('connection', (socket) => {
    console.log(`Usuário conectado. ID: ${socket.id} `);
    socket.on('message', (message) => {
      const newMessage = sentMessage(
        message.nickname,
        message.chatMessage,
      );
      io.emit('message', newMessage);
    });
  });
