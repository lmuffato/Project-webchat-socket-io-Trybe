module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.emit('teste', `novo usuário ${socket.id}  conectado ao socket.io`);
  });
};
