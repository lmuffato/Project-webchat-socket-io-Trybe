const formatMessage = (date, nickname, chatMessage) => (`${date} - ${nickname}: ${chatMessage}`);

const receiveMessage = (socket, io, chatModel) => socket.on(
  'message',
  async ({ chatMessage, nickname }) => {
    const date = new Date().toLocaleString('pt-br', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).toString().replace(/\//g, '-');

    const formatedMessage = formatMessage(date, nickname, chatMessage);

    await chatModel.saveMessage(date, nickname, chatMessage);

    io.emit('message', formatedMessage);
  },
);

const sendConnectedUsers = (io, connectedUsers) => {
  io.emit('connectedUsers', Object.values(connectedUsers));
};

module.exports = {
  receiveMessage,
  formatMessage,
  sendConnectedUsers,
};
