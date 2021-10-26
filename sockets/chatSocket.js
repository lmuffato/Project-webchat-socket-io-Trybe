// const Language = require('../models/Language');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Cliente ${socket.id} acabou de entrar`);
  
  //   socket.on('increaseVotes', async ({ id }) => {
  //     await Language.increaseVotes(id);
  //     const language = await Language.getById(id);
  //     io.emit('refreshCurrentVotes', language);
  
  //     // socket.emit -> manda apenas para quem emitiu
  //     // io.emit -> manda para todos
  //     // socket.broadcast.emit -> manda para todos exceto quem emitiu.
  //   });
  });  
};