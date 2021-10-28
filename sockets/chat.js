const moment = require('moment');
const messagesModels = require('../models/messages');

const date = moment().format('DD-MM-YYYY HH:mm:ss A'); // https://momentjs.com/

module.exports = (io) => io.on('connection', async (socket) => {
    messagesModels.getAllMessages()
    .then((messages) => {
      const arrayMessages = messages.map((message) => {
        const oldMessages = `${message.timestamp} - ${message.nickname}: ${message.message}`;
        // console.log(oldMessages);
        return socket.emit('oldMessagesBD', oldMessages);
      });
      Promise.all(arrayMessages);
    });

    socket.on('message', ({ chatMessage, nickname }) => {
      io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
    });
});