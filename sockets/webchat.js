const moment = require('moment');
const chatModel = require('../models/chatModel');

module.exports = (io) => io.on('connection', (socket) => {
  const { id } = socket;
  const defaultNick = id.slice(0, 16);
  console.log(`Usuário conectado: ${defaultNick}`);
  socket.emit('userData', { id, nickname: defaultNick });

  // lidando com as msg
  socket.on('message', (data) => {
    const { chatMessage, nickname } = data;

    // declarando a data
    const date = moment().format('DD-MM-YYYY HH:mm:ss A');

    // enviando server msg for client
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);

    // salvando msg no DB
    chatModel.createMsg({
      message: chatMessage,
      nickname,
      timestamp: date,
    });
  });
  
  // caso disconnect 
  socket.on('disconnect', () => {
    socket.broadcast.emit('message', `tchau ${socket.id}`);
  });
});