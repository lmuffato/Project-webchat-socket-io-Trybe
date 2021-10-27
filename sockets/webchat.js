module.exports = (io) => io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id} `);

  // lidando com as msg
  socket.on('message', (data) => {
    console.log(data);
    console.log(`Mensagem ${data.chatMessage}`);
    io.emit('message', data.chatMessage);
  });
  // caso disconnect 
  socket.on('disconnect', () => {
    socket.broadcast.emit('message', `tchau ${socket.id}`);
  });
});