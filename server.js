require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const moment = require('moment');
const onlineUsers = require('./utils/connectedUsers');
const messagesList = require('./models/messages');

const expressApp = express();
const httpServer = http.createServer(expressApp);
const ioServer = new Server(httpServer);

expressApp.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});
/** @param {import('socket.io').Socket} socket @param {string} nickname */
const listenDisconnection = (socket, nickname) => {
  socket.on('disconnect', () => {
    onlineUsers.remove(nickname); // não funciona quando o usuario muda de nickname
    ioServer.emit('userList', onlineUsers.getAll());
  });
};
/** @param {import('socket.io').Socket} socket */
const listenNameChange = (socket) => {
  socket.on('nameChange',
    /**
     * @param {object} obj
     * @param {string} obj.oldName
     * @param {string} obj.newName
     */
    ({ oldName, newName }) => {
      onlineUsers.change(oldName, newName);
      ioServer.emit('userList', onlineUsers.getAll());
    });
};
/** @param {import('socket.io').Socket} socket */
const broadcastMessage = (socket) => {
  socket.on('message',
    /**
     * @param {object} obj
     * @param {string} obj.chatMessage
     * @param {string} obj.nickname
     * */
    async ({ chatMessage, nickname: name }) => {
      const timestamp = moment().format('DD-MM-yyyy HH:mm:ss');
      await messagesList.create({ message: chatMessage, nickname: name, timestamp });
      ioServer.emit('message', `${timestamp} ${name} ${chatMessage}`);
    });
};
/** @param {import('socket.io').Socket} socket @param {import('./models/messages').message[]} messages */
const emitMessages = (socket, messages) => {
  socket.emit('messageList',
    messages.map(({ message, nickname, timestamp }) =>
      `${timestamp} ${nickname} ${message}`));
};
ioServer.on('connection',
/** @param {import('socket.io').Socket} socket */
async (socket) => {
  const { nickname } = socket.handshake.headers;
  onlineUsers.add(nickname);
  const messages = await messagesList.getAll();
  emitMessages(socket, messages);
  ioServer.emit('userList', onlineUsers.getAll());
  broadcastMessage(socket);
  listenNameChange(socket);
  listenDisconnection(socket, nickname);
});
httpServer.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}/`);
});
