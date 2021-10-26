const moment = require('moment');
const Model = require('../models/message');

const allUsers = {};

const generetorMessage = async ({ chatMessage, nickname }, io) => {
  const timestamp = moment().format('DD-MM-yyyy HH:mm:ss A');
  await Model.create({ message: chatMessage, nickname, timestamp });
  io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
};

const allMessages = async () => {
  const messages = await Model.getAll();
  return messages;
};

const listUsers = async () => Object.values(allUsers);

const disconnect = (socket, io) => { 
  delete allUsers[socket.id];
  io.emit('allUsers', listUsers());
};

const addUser = (socket, nickname, io) => {
  allUsers[socket.id] = nickname;
  io.emit('allUsers', listUsers());
};

const connection = (socket) => {
  allUsers[socket.id] = socket.id.substring(0, 16);
};

module.exports = {
  generetorMessage,
  allMessages,
  listUsers,
  disconnect,
  addUser,
  connection,
};