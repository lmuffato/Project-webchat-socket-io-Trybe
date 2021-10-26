// const Language = require('../models/Language');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Cliente ${socket.id} acabou de entrar`);
  
    socket.on('updateUsername', (newUsername) => {
      console.log(newUsername);
    // io.emit('updateUsernameList', newUsername);
    });
    socket.on('message', (message) => {
      const date = new Date();
      const timestamp = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()
      } ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      const newMessage = `${message.nickname}@${timestamp}: ${message.chatMessage}`;
      io.emit('message', newMessage);
    });
  });  
};