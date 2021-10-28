const messagesModels = require('../models/messages');

module.exports = (io) => io.on('connection', async (socket) => {
    messagesModels.getAllMessages().then((r) => console.log(r));
  // console.log(`Usuário conectado. ID: ${socket.id} `);
});