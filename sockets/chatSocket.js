module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Cliente ${socket.id} acabou de entrar!`);
  });
};