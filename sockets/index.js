module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('conectado:', socket.id);

    socket.on('message', ({ chatMessage, nickname }) => {
      const date = new Date().toLocaleString('pt-br', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).toString().replace(/\//g, '-');
      io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
    });
  });
};
