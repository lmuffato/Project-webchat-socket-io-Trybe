const onlineUsers = {};

const moment = require('moment');

const modelMessages = require('../models/messages');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('updateUserList', (nickname) => {
    onlineUsers[socket.id] = nickname;
    io.emit('updateUserList', onlineUsers);
  });
  socket.on('disconnect', () => {
    delete onlineUsers[socket.id];
    io.emit('updateUserList', onlineUsers);
  });
  socket.on('message', async ({ chatMessage, nickname }) => {
    const timeStamp = moment().format('DD-MM-YYYY HH:mm:ss');
    await modelMessages.create({ message: chatMessage, nickname, timeStamp });
    const message = `${timeStamp} - ${nickname}: ${chatMessage}`;
    io.emit('message', message);
  });
});