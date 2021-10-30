const moment = require('moment');

const date = moment().format('DD-MM-YYYY HH:mm:ss A'); // https://momentjs.com/
const users = [];

const cont = 0;
module.exports = (io) => io.on('connection', async (socket) => {
    const newNicknName = socket.id.slice(0, 16);
    
    socket.on('initConnection', () => {
      //  socket.emit('showNicknamesOfUsersLoggeds', `${newNicknName}`); 
      io.emit('showNicknamesOfUsersLoggeds', `${newNicknName}`); 
    });

    socket.on('saveUserOnArray', (newUserLogged) => {
      if (io.engine.clientsCount > users.length) {
        users.push(newUserLogged);
        
        console.log(users);
      }
     
    });
    socket.emit('listOldUsers', users);
    

    socket.on('message', ({ chatMessage, nickname }) => {
      io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
    });
});
