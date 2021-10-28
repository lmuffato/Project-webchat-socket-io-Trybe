const moment = require('moment');
const messagesModel = require('../models/messagesModel');

let connectedUsers = {};

module.exports = (io) => io.on('connection', async ( socket ) => {
  connectedUsers.push(socket.id);
  io.emit('userConnection', connectedUsers);
  socket.emit('recoverMessages', await messagesModel.findAll());
  socket.on('message', async ({ chatMessage, nickname }) => {
    const timestamp = moment().format('DD-MM-yyyy HH:mm:ss A');
    const serializedMessage = `${timestamp} - ${nickname}: ${chatMessage}`
    await messagesModel.create({ timestamp, nickname, chatMessage });
    io.emit('message',  serializedMessage);
  });

  socket.on('changeNick', (nick) => {
    const updatedConnections = connectedUsers.map((userId) => {
      if (userId === socket.id) return nick
      return userId
    });
    connectedUsers = updatedConnections;

    io.emit('userConnection', connectedUsers);
  });
});