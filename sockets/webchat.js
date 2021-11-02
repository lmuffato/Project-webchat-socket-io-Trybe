const moment = require('moment');
const { 
    addMessage, 
    getMessages, 
    addUser, 
    deleteUser, 
    getUsers, 
    updateNickname } = require('../models/webchat');

    const createMessage = async ({ chatMessage, nickname }, io) => {
        const dataAtual = moment().format('DD-MM-YYYY HH:mm:ss A');
        await addMessage({ message: chatMessage, nickname, timestamp: dataAtual });
        io.emit('message', `${dataAtual} - ${nickname}: ${chatMessage}`);
    };

module.exports = (io) => 
    io.on('connection', async (socket) => {
        // socket.disconnect(0);
    const messages = (await getMessages())
    .map(({ message, nickname: nick, timestamp }) => `${timestamp} - ${nick}: ${message}`);
    const users = addUser(socket.id, socket.id.substring(0, 16));
    socket.emit('userConnected', socket.id);
    socket.emit('messages', messages);
    io.emit('users', users);
    socket.on('saveNickname', (nickname) => {
        const updatedUsers = updateNickname(socket.id, nickname);
        io.emit('users', updatedUsers);
    });
    socket.on('message', async (data) => {
        await createMessage(data, io);
    });
   socket.on('disconnect', () => {
      deleteUser(socket.id);
       io.emit('users', getUsers());
   });
});
