module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Cliente ${socket.id} acabou de entrar!`);

    socket.on('message', (msg) => {
      io.emit('message', msg);
    });
  });
};