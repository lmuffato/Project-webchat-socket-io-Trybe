const moment = require('moment');

const date = moment().format('DD-MM-YYYY HH:mm:ss A'); // https://momentjs.com/
module.exports = (io) => io.on('connection', async (socket) => {
    const newNicknName = socket.id.slice(0, 16);

    console.log('testa', newNicknName);

    socket.on('initConnection', () => console.log('Novo usuário logado'));

    socket.on('initConnection', () => {
      socket.emit('showNicknamesOfUsersLoggeds', `${newNicknName}`); 
      console.log('Novo usuário logado');
    });

    socket.on('message', ({ chatMessage, nickname }) => {
      io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
    });

    socket.on('userNickname', (newUserLogged) => {
      console.log(newUserLogged, 'wwwwwwwwww')
      io.emit('addNickinameInOtherUser', newUserLogged);
    });
});
