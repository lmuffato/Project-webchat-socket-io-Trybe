const chatService = require('../services/chatService');

module.exports = (io) => {
  io.on('connection', async (socket) => {
    // console.log(socket);

    socket.on('message', async (data) => {
      const message = await chatService.createMessage(data);
      io.emit('message', message); 
        console.log(message);// enviar ao front mensagem já formatada
    });

    socket.on('generateNickname', async (data) => {
      io.emit('generateNickname', data);
    });
  
    // Outra forma de fazer a renderização das msgs - renderização no lado do cliente
    // socket.on('refreshAllMessages', async () => {
    //   const allMessages = await chatService.getAllMessages();
    //   io.emit('refreshAllMessages', allMessages);
    //   console.log(allMessages, 'all Messages');
    // });
  
    socket.on('disconnect', () => {
      socket.broadcast.emit('serverMessage', `eita, ${socket.id} saiu`);
    });
  }); 
};
