const moment = require('moment');
const { saveMessage } = require('../models/chatModel');

const usersOn = {};

module.exports = (io) => io.on('connection', async (socket) => {
  const randomName = socket.id.slice(-16);
  
  usersOn[socket.id] = randomName;

  io.emit('nickname', randomName);
  io.emit('login', usersOn);

  socket.on('message', async ({ chatMessage, nickname }) => {
    const dataAtual = moment().format('DD-MM-YYYY');
    const horaAtual = moment().format('LTS');
    const message = `${dataAtual} ${horaAtual} - ${nickname}: ${chatMessage}`;
    io.emit('message', message);
    const timestamp = `${dataAtual} ${horaAtual}`;
    const data = { message: chatMessage, nickname, timestamp };
    await saveMessage(data);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('message', `Usuário ${socket.id} acabou de se desconectar! :(`);
    delete usersOn[socket.id]; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
    io.emit('login', usersOn);
  });
});