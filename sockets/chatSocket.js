const sendMessage = require('./sendMessage');

let usersOn = {};

// eslint-disable-next-line max-lines-per-function
module.exports = (io) => io.on('connection', (socket) => {
  //  socket.disconnect(0);
  const randomName = socket.id.slice(-16);
  
  usersOn[socket.id] = randomName;

  const users = Object.entries(usersOn);

  if (users[0][0] !== socket.id) {
    usersOn = {};
    const arrLength = users.length;
    const lastUser = users[arrLength - 1];
    // const firstUser = users[0];
    users.splice(0, 0, lastUser);
    users.splice(users.length - 1, 1);
    // const newArr = users.replace(firstUser, lastUser);
    for (let i = 0; i < arrLength; i += 1) {
      const key = users[i][0];
      const value = users[i][1];
      usersOn[key] = value;
    }
  }

  io.emit('nickname', randomName);
  io.emit('login', usersOn);

  socket.on('message', async ({ chatMessage, nickname }) => {
    await sendMessage(io, { chatMessage, nickname });
  });

  socket.on('updateNick', (nick) => {
    io.emit('nickname', nick);
    usersOn[socket.id] = nick;
    io.emit('login', usersOn);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('message', `Usuário ${socket.id} acabou de se desconectar! :(`);
    delete usersOn[socket.id]; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
    io.emit('login', usersOn);
  });
});