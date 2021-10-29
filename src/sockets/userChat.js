const onlineUsers = {};

const moment = require('moment');

// const modelMessages = require('../../models/messages');

// const generateTimeStamp = require('../utils/generateTimeStamp');

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
    const timeStamp = moment().format('YYYY-MM-DD h:mm:ss A');
 //   await modelMessages.create({ timeStamp, nickname, chatMessage });
    const message = `${timeStamp} - ${nickname}: ${chatMessage}`;
    io.emit('message', message);
  });
});