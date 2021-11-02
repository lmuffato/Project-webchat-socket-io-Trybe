const moment = require('moment');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const date = moment().format('DD-MM-YYYY HH:mm:ss A');

    const data = `${date} - ${nickname}: ${chatMessage}`;

    io.emit('message', data);
  });
  socket.on('disconnect', () => {
    socket.broadcast.emit('message', `${socket.id} acabou de se desconectar!`);
  });
});