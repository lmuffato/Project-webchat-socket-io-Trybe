const moment = require('moment');
const { saveMessage } = require('../models/chatModel');

module.exports = (io) => io.on('connection', async (socket) => {
  const randomName = socket.id.slice(-16);
  // const userMessage = await getAllMessages();

  io.emit('nickname', randomName);
  // socket.emit('getHistory', userMessage);

  socket.on('message', async ({ chatMessage, nickname }) => {
    const dataAtual = moment().format('DD-MM-YYYY');
    const horaAtual = moment().format('LTS');
    const message = `${dataAtual} ${horaAtual} - ${nickname}: ${chatMessage}`;
    io.emit('message', message);
    const timestamp = `${dataAtual} ${horaAtual}`;
    const data = { message: chatMessage, nickname, timestamp };
    await saveMessage(data);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('message', `Usuário ${socket.id} acabou de se desconectar! :(`);
  });
});