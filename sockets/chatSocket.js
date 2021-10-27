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
      console.log(data);
    });
  
    // socket.on('refreshAllMessages', async () => {
    //   const allMessages = await chatService.getAllMessages();
    //   socket.emit('refreshAllMessages', allMessages);
    //   console.log(allMessages, 'all Messages');
    // });

    socket.on('disconnect', () => {
      socket.broadcast.emit('serverMessage', `eita, ${socket.id} saiu`);
    });
  }); 
};
