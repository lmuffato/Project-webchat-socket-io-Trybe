const moment = require('moment');

module.exports = (io) => io.on('connection', (socket) => {
  const randomName = socket.id.slice(-16);

  io.emit('nickname', randomName);

  socket.on('message', ({ chatMessage, nickname }) => {
    const dataAtual = moment().format('DD-MM-YYYY');
    const horaAtual = moment().format('LTS');
    const message = `${dataAtual} ${horaAtual} - ${nickname}: ${chatMessage}`;
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('message', `Usuário ${socket.id} acabou de se desconectar! :(`);
  });
});