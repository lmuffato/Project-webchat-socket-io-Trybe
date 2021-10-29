module.exports = (io) => io.on('connection', (socket) => {
  socket.emit('serverMessage', 'Bem-vindo ao chat público!');

  socket.broadcast.emit('serverMessage', `${socket.id} acabou de conectar`);

  socket.on('clientMessage', (message) => {
    io.emit('serverMessage', message);
  });
});
