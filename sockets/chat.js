const moment = require('moment');
const messagesModels = require('../models/messages');

const date = moment().format('DD-MM-YYYY HH:mm:ss A'); // https://momentjs.com/

module.exports = (io) => io.on('connection', async (socket) => {
    messagesModels.getAllMessages()
    .then((messages) => {
      messages.forEach((message) => {
        console.log(`${message.timestamp} - ${message.nickname}: ${message.message}`);
      });
    });

    socket.on('message', ({ chatMessage, nickname }) => {
      io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
    });
});