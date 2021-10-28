const chatService = require('../services/chatService');

const users = {};

module.exports = (io) => {
  io.on('connection', async (socket) => {
    users[socket.id] = socket.id.substring(0, 16);
    io.emit('usersOnline', Object.values(users));
    // console.log(Object.values(users), 'lista de users');
  
    socket.on('message', async (data) => {
      const message = await chatService.createMessage(data);
      io.emit('message', message); 
    });

    socket.on('generateNickname', (data) => {
      users[socket.id] = data; 
      io.emit('usersOnline', Object.values(users));
    });
    socket.on('disconnect', () => {
      delete users[socket.id];
      io.emit('usersOnline', Object.values(users));
    });
  }); 
};
