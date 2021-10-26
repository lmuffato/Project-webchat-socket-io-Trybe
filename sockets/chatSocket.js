// const Language = require('../models/Language');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Cliente ${socket.id} acabou de entrar`);
  
    socket.on('updateUsername', (newUsername) => {
      console.log(newUsername);
    // socket.emit('refreshCurrentVotes', language);
  
  //     // socket.emit -> manda apenas para quem emitiu
  //     // io.emit -> manda para todos
  //     // socket.broadcast.emit -> manda para todos exceto quem emitiu.
    });
  });  
};