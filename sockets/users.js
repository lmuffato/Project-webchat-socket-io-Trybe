const usersOnline = [];

function disconnect(io, userName) {
  const loggoutUserIndex = usersOnline.indexOf(userName); // se o socketid n existe aqui, como buscar o index do usuario dentro do array?
  usersOnline.splice(loggoutUserIndex, 1);
  io.emit('usersOnline', usersOnline);
  // 8 aqui, no evento de disconnect, eu atualizo o array , removendo a pessoa que saiu, e mando esse novo array para ser recriado no passo 7
}

module.exports = (io) =>
  io.on(
    'connection',
    /**
     * @param {import('socket.io').Socket} socket
     */
    (socket) => {
      let userName;
      socket.on('listUser', (user) => {
        userName = user;
        usersOnline.push(user);
        // 2 recebo o nickname como parametro no backend e adiciono no Array;
        socket.emit('listUser', user);
        // 3.1 emito novamente o usuário que acabei de receber para o novo usuário
        socket.broadcast.emit('listUser', user);
        // 3.2 emito o usuário pra todos que já estão no chat
      });
      socket.emit('usersOnline', usersOnline);
      // 5 neste evento, enviamos o array novamente que possivelmente foi atualizado pelo evento 'listUser', no momento da conexão do usuário
      socket.on('changeUserName', (newName) => {
        console.log('newName', newName);
        const changingName = usersOnline.indexOf(userName);
        usersOnline[changingName] = newName;
        io.emit('changeUserName', [userName, newName]);
        userName = newName;
      });
      socket.on('disconnect', () => disconnect(io, userName));
    },
  );
