const moment = require('moment');

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id} `);

  // lidando com as msg
  socket.on('message', (data) => {
    const { chatMessage, nickname } = data;

    // declarando a data
    const date = moment().format('DD-MM-YYYY HH:mm:ss A');

    // enviando server msg for client
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
  });
  
  // caso disconnect 
  socket.on('disconnect', () => {
    socket.broadcast.emit('message', `tchau ${socket.id}`);
  });
});