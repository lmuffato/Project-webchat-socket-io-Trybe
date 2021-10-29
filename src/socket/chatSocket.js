const moment = require('moment');
const { createMessage, getAll } = require('../../models/Messages');

module.exports = (io) => {
  const usersArray = [];

  io.on('connection', async (socket) => {
    console.log(`Usuário conectado. ID: ${socket.id} `);
  
    usersArray.push(socket.id);
    io.emit('refreshList', usersArray);

    const messages = await getAll();
    console.log(messages);
    io.emit('get-storaged-messages', messages);

    socket.on('message', async ({ chatMessage, nickname }) => {
      const messageDate = new Date();

      const formatedDate = moment(messageDate).format('DD-MM-yyyy HH:mm:ss');

      const message = `${formatedDate} - ${nickname}: ${chatMessage}`;
      console.log(`${message}`);

      await createMessage(message);

      io.emit('message', message);
  });
});
};