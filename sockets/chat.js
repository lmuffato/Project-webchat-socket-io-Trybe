const moment = require('moment');
const { getAllMessages, saveMessage } = require('../models/messages');

const messagesHistory = async () => getAllMessages();
const saveHistory = async ({ 
  timestamp,
  nickname,
  chatMessage }) => saveMessage({ timestamp, nickname, chatMessage });

const timestamp = moment().format('DD-MM-YYYY HH:mm:ss');

const users = [];

module.exports = (io) => {
  io.on('connection', async (socket) => {
    console.log(socket.id);
  
    users[socket.id.slice(0, 16)] = socket.id.slice(0, 16);
    
    socket.on('message', async ({ chatMessage, nickname }) => {
      await saveHistory({ timestamp, nickname, chatMessage });
      io.emit('message', `${timestamp} - ${nickname} : ${chatMessage}`);
    });
    
    socket.emit('showHistory', await messagesHistory());
    io.emit('userList', Object.values(users));

    socket.on('newNickname', (nickname) => {
      users[socket.id.slice(0, 16)] = nickname;
      io.emit('userList', Object.values(users));
    });

    socket.on('disconnect', () => {
      delete users[socket.id.slice(0, 16)];
      io.emit('userList', Object.values(users));
    });
  });
};