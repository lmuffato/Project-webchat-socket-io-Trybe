const moment = require('moment');
const Chat = require('../models/chatModels');

const date = moment().format('DD-MM-YYYY HH:mm:ss A');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.emit('defaultNick', socket.id.substring(0, 16));

    socket.on('message', ({ chatMessage, nickname }) => {
      io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
      Chat.addMsg({ chatMessage, nickname, timestamp: date });
    });
  });
};
