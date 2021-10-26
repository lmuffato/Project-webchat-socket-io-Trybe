module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(socket);

    socket.on('message', async (data) => {
      // await model de chat,
      io.emit('refreshChat', data.chatMessage); // enviar ao front mensagem já formatada
    });
  }); 
};
