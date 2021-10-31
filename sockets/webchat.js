const moment = require('moment');
const chatModel = require('../models/chatModel');

const users = {};
const date = moment().format('DD-MM-YYYY HH:mm:ss A');

module.exports = (io) => io.on('connection', (socket) => {
  // setando user no onlineLis
  users[socket.id] = socket.id.slice(0, 16);
  socket.emit('userData', { id: socket.id, nickname: socket.id.slice(0, 16) });
  io.emit('usersOnline', users);
  // salvando novo nickName
  socket.on('newUserName', (data) => {
    users[socket.id] = data.nickName;
    socket.emit('userData', { id: socket.id, nickname: data.nickName });
    io.emit('usersOnline', users);
  });
  // lidando com as msg
  socket.on('message', (data) => {
    const { chatMessage, nickname } = data;
    // enviando server msg for client
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
    // salvando msg no DB
    chatModel.createMsg({ message: chatMessage, nickname, timestamp: date });
  });
  // caso disconnect 
  socket.on('disconnect', () => {
    socket.broadcast.emit('message', `tchau ${socket.id}`);
    delete users[socket.id];
    io.emit('usersOnline', users);
  });
});