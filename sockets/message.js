const Message = require('../models/Message');

const onlineClients = {};

const socketController = (io) => (socket) => {
  // console.log(`New connection. Id: ${socket.id}`);
  socket.emit('checkNickname');
  socket.emit('clientsUpdate', onlineClients);

  socket.on('nickname', (nickname) => {
    onlineClients[socket.id] = nickname;
    io.emit('clientsUpdate', onlineClients);
    console.log(onlineClients);
  });

  socket.on('message', async ({ chatMessage, nickname }) => {
    const dateStr = new Date().toLocaleString('en-GB').replace(/\//g, '-').replace(',', '');

    await Message.saveMessage({ message: chatMessage, nickname, timestamp: dateStr });
    const message = `(${dateStr}) ${nickname}: ${chatMessage}`;
    io.emit('message', message);
  });
  
  socket.on('disconnect', () => {
    delete onlineClients[socket.id];
    socket.broadcast.emit('clientsUpdate', onlineClients);
  });
};

module.exports = (io) => {
  io.on('connection', socketController(io));
};
