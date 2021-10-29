const moment = require('moment');
const chatModel = require('../../models/chatModel');

const Users = {};

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const dataHours = moment().format('DD-MM-yyyy HH:mm:ss A');
    await chatModel.createModel({ timestamp: dataHours, nickname, message: chatMessage });
    io.emit('message', `${dataHours} - ${nickname}: ${chatMessage}`);
  });
  
  Users[socket.id] = socket.id.substring(0, 16);
  io.emit('show_Users', Object.values(Users));

  socket.on('saveName', (nickname) => {
    Users[socket.id] = nickname;
    io.emit('show_Users', Object.values(Users));
  });

  socket.on('disconnect', () => {
    delete Users[socket.id];
    io.emit('show_Users', Object.values(Users));
  });
});