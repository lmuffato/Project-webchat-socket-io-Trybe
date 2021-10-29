const dayjs = require('dayjs');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const timeStamp = dayjs().format('DD-MM-YYYY HH:mm:ss');
    io.emit('message', `${timeStamp} - ${nickname}: ${chatMessage}`);
  });
  // socket.on('disconnect', () => {
  //   socket.broadcast.emit('message', `${socket.io} se desconectou.`)
  // });
});
