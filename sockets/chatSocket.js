module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(socket);

    socket.on('clientMessage', async (message) => {
      // await model de chat,
      io.emit('refreshChat', message);
    });
  }); 
};
