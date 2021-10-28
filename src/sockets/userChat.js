const onlineUsers = {};

// const modelMessages = require('../../models/messages');

const generateTimeStamp = require('../utils/generateTimeStamp');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('updateUserlist', (nickname) => {
    onlineUsers[socket.id] = nickname;
    io.emit('updateUserlist', onlineUsers);
  });
  socket.on('disconnect', () => {
    delete onlineUsers[socket.id];
    io.emit('updateUserlist', onlineUsers);
  });
  socket.on('message', async ({ chatMessage, nickname }) => {
    const timeStamp = generateTimeStamp();
 //   await modelMessages.create({ timeStamp, nickname, chatMessage });
    const message = `${timeStamp} - ${nickname}: ${chatMessage}`;
    io.emit('message', message);
  });
});