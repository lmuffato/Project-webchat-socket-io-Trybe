const moment = require('moment');

module.exports = (io) => {
  io.on('connection', (socket) => {
    const userId = socket.id.substring(0, 16);
    io.emit('nickname', userId);
  
    socket.on('nickname', (nick) => {
      io.emit('nicknameGenerator', { nickname: nick });
    });
  
    socket.on('message', ({ nickname, chatMessage }) => {
      const timestamp = moment().format('DD-MM-yyyy hh:mm:ss A');
      io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
    });
  });
};