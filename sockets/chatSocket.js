const moment = require('moment');
const Chat = require('../models/chatModels');

const date = moment().format('DD-MM-YYYY HH:mm:ss A');
const users = {};

const handleSocket = (io) => {
  io.on('connection', (socket) => {
    // socket.disconnect(0);
    const defaultName = socket.id.substring(0, 16);
    users[socket.id] = defaultName;
    socket.emit('defaultName', { defaultName, id: socket.id });
    io.emit('users', users);

    socket.on('message', ({ chatMessage, nickname }) => {
      io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
      Chat.addMsg({ chatMessage, nickname, timestamp: date });
    });

    socket.on('nameChange', (name) => {
      users[socket.id] = name;
      io.emit('users', users);
    });

    socket.on('disconnect', () => {
      delete users[socket.id];
      io.emit('users', users);
    });
  });
};

module.exports = {
  users,
  handleSocket,
};
