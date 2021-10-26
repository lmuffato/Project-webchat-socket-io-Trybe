const dataAtualFormatada = require('../util/formatData');

module.exports = (io) => io.on('connection', (socket) => {
  const nickname = socket.id;

  socket.emit('message',
  `Seja bem vindo ao nosso chat público ${nickname}! Use essa página para conversar a vontade.`);

  socket.broadcast.emit('message', `Usuário! ${nickname} acabou de se conectar :D`);

  socket.on('message', ({ chatMessage }) => {
     // 09-10-2020 2:35:09 PM - Joel: Olá meu caros amigos!
    const message = `${dataAtualFormatada()} (pegarHora) - ${nickname}: ${chatMessage}`;
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('message', `Usuário ${nickname} acabou de se desconectar! :(`);
  });
});