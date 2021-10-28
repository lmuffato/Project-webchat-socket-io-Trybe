const moment = require('moment');
const messagesModel = require('../models/messagesModel');

let connectedUsers = {};

module.exports = (io) => io.on('connection', async ( socket ) => {
  connectedUsers[socket.id] = socket.id.substring(0, 16);
  io.emit('userConnection', Object.values(connectedUsers));
  socket.emit('recoverMessages', await messagesModel.findAll());
  socket.on('message', async ({ chatMessage, nickname }) => {
    const timestamp = moment().format('DD-MM-yyyy HH:mm:ss A');
    const serializedMessage = `${timestamp} - ${nickname}: ${chatMessage}`
    await messagesModel.create({ timestamp, nickname, chatMessage });
    io.emit('message',  serializedMessage);
  });

  socket.on('changeNick', (nick) => {
    connectedUsers[socket.id] = nick;

    io.emit('userConnection', Object.values(connectedUsers));
  });

  socket.on('disconnect', () => {
    delete connectedUsers[socket.id];

    io.emit('userConnection', Object.values(connectedUsers));
  })
});