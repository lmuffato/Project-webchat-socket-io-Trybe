const moment = require('moment');

/*
obj message = {
  nickname,
  timestamp,
  chatMessage
}
 */

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id} `);

  socket.on('message', async (data) => {
    const { nickname, chatMessage } = data;
    const timestamp = new Date();
    io.emit('message', `${moment(timestamp)
      .format('DD-MM-yyyy HH:mm:ss a')} - ${nickname}: ${chatMessage}`);
  });
});