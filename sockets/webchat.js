module.exports = (io) => io.on('connection', (socket) => {
  socket.on('clientMessage', (message) => {
    console.log(`Mensagem ${message}`);
    io.emit('serverMessage', message);
  });
  socket.on('disconnect', () => {
    socket.broadcast.emit('serverMessage', `tchau ${socket.id}`);
  });
});