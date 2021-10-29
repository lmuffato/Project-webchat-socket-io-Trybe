module.exports = (io) => io.on('connection', (socket) => {
  socket.on('joinChat', ({ username }) => {
    const activeUser = username === undefined ? socket.id.slice(-16) : username;
    
    socket.emit('serverMessage', 'Bem-vindo ao chat público!');

    socket.broadcast.emit('serverMessage', `${activeUser} acabou de conectar`);

    socket.on('message', ({ chatMessage, nickname }) => {
      const messageUser = nickname === undefined ? socket.id.slice(-16) : nickname;

      io.emit('serverMessage', `${messageUser}: ${chatMessage}`);
    });
  });
});
