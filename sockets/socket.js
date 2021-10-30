const {
  messageToReturn,
  getNickName,
  saveMessageOnDataBase,
  addUserConnected,
  removeUserDisconnected,
  changenickName,
  nickNameList,
 } = require('./utils/utils');

let activeUsers = [];

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`Alguém ${socket.id} se conectou`);

  // Atualiza a lista quando um usuáiro é conectado
  activeUsers = [...addUserConnected(activeUsers, socket.id)];

  socket.emit('myNick', getNickName(activeUsers, socket.id));

  // Atualiza a lista para todos os usuários conectados
  io.emit('activeClients', nickNameList(activeUsers));

  // Quando algum usuário salva um novo nickname
  socket.on('nickName', (nickName) => {
    // Atualzia o nome na lista de usuáiros ativos
    activeUsers = changenickName(activeUsers, socket.id, nickName);
    
    // Atualiza a lista para todos os usuários conectados
    socket.emit('myNick', getNickName(activeUsers, socket.id));
    io.emit('activeClients', nickNameList(activeUsers));
  });

  // Quando a mensagem é enviada pelo front-end
  socket.on('message', ({ chatMessage, nickname }) => {
    // Manda a mensagem de volta para todos os usuários conectados
    // const user = getNickName(activeUsers, socket.id);
    // io.emit('message', messageToReturn(user, chatMessage));
    saveMessageOnDataBase(nickname, chatMessage);
    io.emit('message', messageToReturn(nickname, chatMessage));
  });

  // Manda uma mensagem de boas vindas apenas pra quem chegou na sala;
  // socket.emit('serverMessage', 'Seja bem vindo');

  // Avisa a todos os outros usuários ativos que alguém conectou;
  // socket.broadcast.emit('serverMessage', `${socket.id} acabou de entrar...`);

  // Quando alguém desconecta
  socket.on('disconnect', () => {
    // Atualiza a lista de usuários conectados
    activeUsers = removeUserDisconnected(activeUsers, socket.id);

    // Atualiza a lista para todos os usuários
    io.emit('activeClients', nickNameList(activeUsers));
    // console.log(activeUsers);
    // console.log('Alguém saiu');
    // socket.broadcast.emit('serverMessage', `${socket.id} acabou de sair.`);
  });
});

// listActiveUser(Object.keys(socket.server.engine.clients));
// console.log(Object.keys(socket.server.engine.clients));