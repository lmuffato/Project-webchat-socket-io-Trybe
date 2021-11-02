const moment = require('moment');
const { addMessage, getMessages } = require('../models/webchat');

module.exports = (io) => 
    io.on('connection', async (socket) => {
    const messages = await getMessages();
    socket.emit('userConnected', socket.id);
    socket.emit('messages', messages);
    
   socket.on('message', async ({ chatMessage, nickname }) => {
    const dataAtual = moment().format('DD-MM-YYYY HH:mm:ss A');
    const message = `${dataAtual} - ${nickname} ${chatMessage}`;
    await addMessage({ message: chatMessage, nickname, timestamp: dataAtual });
    io.emit('message', message);
   }); 
});