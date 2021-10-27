const chatModel = require('../models/chat');

const formatMessage = (date, nickname, chatMessage) => (`${date} - ${nickname}: ${chatMessage}`);

const chat = async (_req, res) => {
  const messagesData = await chatModel.getMessages();

  console.log(messagesData);
  
  const messages = messagesData
    .map(({ timestamp, nickname, message }) => formatMessage(timestamp, nickname, message));

  res.status(200).render('index', { messages });
};

const socketConnection = (io) => {
  io.on('connection', (socket) => {
    console.log('conectado:', socket.id);

    socket.on('message', async ({ chatMessage, nickname }) => {
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
    });
  });
};

module.exports = {
  chat,
  socketConnection,
};
