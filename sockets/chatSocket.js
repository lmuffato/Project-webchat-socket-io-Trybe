const chatService = require('../services/chatService');

const users = {};

module.exports = (io) => {
  io.on('connection', async (socket) => {
    users[socket.id] = socket.id.substring(0, 16);
    io.emit('usersOnline', Object.values(users));

    socket.on('message', async (data) => {
      const message = await chatService.createMessage(data);
      io.emit('message', message); 
        console.log(message);// enviar ao front mensagem já formatada
    });

    socket.on('generateNickname', async (data) => {
      io.emit('generateNickname', data);
      users[socket.id] = data;
      io.emit('usersOnline', Object.values(users));
    });
    // Outra forma de fazer a renderização das msgs - renderização no lado do cliente
    // socket.on('refreshAllMessages', async () => {
    //   const allMessages = await chatService.getAllMessages();
    //   io.emit('refreshAllMessages', allMessages);
    //   console.log(allMessages, 'all Messages');
    // });
    socket.on('disconnect', () => {
      // socket.broadcast.emit('serverMessage', `eita, ${socket.id} saiu`);
      delete users[socket.id];
      io.emit('usersOnline', Object.values(users));
    });
  }); 
};
