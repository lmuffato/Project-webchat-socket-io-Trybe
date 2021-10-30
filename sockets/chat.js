const moment = require('moment');

const date = moment().format('DD-MM-YYYY HH:mm:ss A'); // https://momentjs.com/
const users = [];

const initConnection = (io, socket, newNicknName) => {
  socket.on('initConnection', () => {
    io.emit('showNicknamesOfUsersLoggeds', `${newNicknName}`); 
    socket.emit('listOldUsers', users);
  });
};

const saveUserOnArray = (io, socket) => {
  socket.on('saveUserOnArray', (newUserLogged) => {
    if (io.engine.clientsCount > users.length) {
      users.push(newUserLogged);
      console.log(users);
    }
  });
};

const changeNickname = (io, socket) => {
  socket.on('newNickname', ({ newNickname, id }) => {
    users.forEach((user, index) => {
      if (user.id === id)users[index].innerText = newNickname;
    });
    socket.broadcast.emit('changeNickname', { newNickname, id });
  });
};

module.exports = (io) => io.on('connection', async (socket) => {
    const newNicknName = socket.id.slice(0, 16);
    
    initConnection(io, socket, newNicknName);

    saveUserOnArray(io, socket);

    changeNickname(io, socket);
    
    socket.on('message', ({ chatMessage, nickname }) => {
      io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
    });
});
