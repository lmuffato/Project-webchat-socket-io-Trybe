const moment = require('moment');

module.exports = (io) => {
  const usersArray = [];

  io.on('connection', (socket) => {
    console.log(`Usuário conectado. ID: ${socket.id} `);
  
    usersArray.push(socket.id);

    io.emit('refreshList', usersArray);

    socket.on('message', ({ chatMessage, nickname }) => {
      const messageDate = new Date();

      const formatedDate = moment(messageDate).format('DD-MM-yyyy HH:mm:ss');

      const message = `${formatedDate} - ${nickname}: ${chatMessage}`;
      console.log(`${message}`);

      io.emit('message', message);
  });
});
};