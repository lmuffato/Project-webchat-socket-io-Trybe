const moment = require('moment');
const { addMessage, getMessages } = require('./models/chatHistoric');

module.exports = (io) => {
  io.on('connection', async (socket) => {
    const messages = await getMessages();
    socket.emit('listMessages', messages);

    socket.emit('idNickname', socket.id.substr(4, 20));

    socket.on('message', async ({ chatMessage, nickname }) => {
      const dateAndOur = moment().format('DD-MM-YYYY h:mm:ss A');
      await addMessage({ chatMessage, nickname, dateAndOur });
      io.emit('message', `${dateAndOur} - ${nickname}: ${chatMessage}`);
    });
  });
};
