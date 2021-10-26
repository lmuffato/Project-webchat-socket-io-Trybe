const sentMessage = (nickname, chatMessage) => {
  const date = new Date();
  return `${date} - ${nickname}: ${chatMessage}`;
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
