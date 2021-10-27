const moment = require('moment');
// const { getRandomName } = require('../middlewares/chat');

module.exports = (io) => io.on('connection', (socket) => {
  // socket.emit('nickname', getRandomName());
  socket.on('message', ({ chatMessage, nickname }) => {
    const dataAtual = moment().format('DD-MM-YYYY');
    const horaAtual = moment().format('LTS');
     // 09-10-2020 2:35:09 PM - Joel: Olá meu caros amigos!

    const message = `${dataAtual} ${horaAtual} - ${nickname}: ${chatMessage}`;
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('message', `Usuário ${socket.io} acabou de se desconectar! :(`);
  });
});