module.exports = (io) => io.on('connection', (socket) => {
  socket.on('joinChat', ({ username }) => {
    socket.emit('serverMessage', 'Bem-vindo ao chat público!');

    socket.broadcast.emit('serverMessage', `${username} acabou de conectar`);

    socket.on('clientMessage', (message) => {
      io.emit('serverMessage', message);
    });
  });
});
