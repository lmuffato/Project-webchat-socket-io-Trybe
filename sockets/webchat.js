const moment = require('moment');
const Model = require('../models/message');

const allUsers = {};

const webchat = (io) => {
  io.on('connection', (socket) => {
    allUsers[socket.id] = socket.id.substring(0, 16);
    io.emit('allUsers', Object.values(allUsers));
  
    socket.on('nicknameChange', (data) => {
      allUsers[socket.id] = data;
      io.emit('allUsers', Object.values(allUsers));
    });
  
    socket.on('message', async ({ nickname, chatMessage }) => {
      const timestamp = moment().format('DD-MM-yyyy HH:mm:ss A');
      await Model.create({ message: chatMessage, nickname, timestamp });
      io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
    });
  
    socket.on('disconnect', () => {
      delete allUsers[socket.id];
      io.emit('allUsers', Object.values(allUsers));
    });
  });
};

module.exports = webchat;