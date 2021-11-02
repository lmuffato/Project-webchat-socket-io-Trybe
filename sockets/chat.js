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
    users[socket.id.slice(0, 16)] = socket.id.slice(0, 16);
    const usersNick = Object.values(users);
    const nick = usersNick.filter((n) => n === socket.id.slice(0, 16));
    socket.emit('userName', nick);
    socket.emit('showHistory', await messagesHistory());

    io.emit('userList', Object.values(users));
    socket.on('message', async ({ chatMessage, nickname }) => {
      await saveHistory({ timestamp, nickname, chatMessage });
      io.emit('message', `${timestamp} - ${nickname} : ${chatMessage}`);
    });

    socket.on('newNickname', (nickname) => {
      console.log(nickname);
      users[socket.id.slice(0, 16)] = nickname;
      console.log(usersNick, users);

      io.emit('userList', Object.values(users));
    });
  });
};