const {
  messageToReturn,
  getNickName,
  recoveryMsgOnDataBase,
  addUserConnected,
  removeUserDisconnected,
  changenickName,
  nickNameList,
 } = require('./utils/utils');

let activeUsers = [];

// # QUANDO UM USUÁIRO É CONECTADO #
module.exports = (io) => io.on('connection', async (socket) => {
  // Envia o histórico
  socket.emit('msgHistoric', await recoveryMsgOnDataBase());

  // Atualiza a lista quando um usuáiro é conectado
  activeUsers = [...addUserConnected(activeUsers, socket.id)];

  // Envia para o fron-endr, o nome do usuário;
  socket.emit('myNick', getNickName(activeUsers, socket.id));

  // Envia uma lista de nomes personalizada
  io.emit('activeClients', nickNameList(activeUsers));
  // personalizedListMe(activeUsers, socket.id, socket);

  // # QUNADO O USUÁRIO MUDA O NOME DO NICK #
  socket.on('nickName', (nickName) => {
    // Atualzia o nome na lista de usuáiros ativos
    activeUsers = changenickName(activeUsers, socket.id, nickName);

    // Atualiza o nome da pessoa no fron-end
    socket.emit('myNick', getNickName(activeUsers, socket.id));

    // Atualiza a lista de nomes a serem exibidos
    io.emit('activeClients', nickNameList(activeUsers));
    // return personalizedListMe(activeUsers, socket.id, socket);
  });

  // # QUANDO UM USUÁRIO ENVIA UMA MENSAGEM #
  socket.on('message', ({ chatMessage, nickname }) => io
    .emit('message', messageToReturn(nickname, chatMessage)));

  // # QUANDO UM USUÁRIO É DESCONECTADO #
  socket.on('disconnect', () => {
    // Atualiza a lista de usuários conectados
    activeUsers = removeUserDisconnected(activeUsers, socket.id);

    // Atualiza a lista para todos os usuários
    io.emit('activeClients', nickNameList(activeUsers));
    // return personalizedListMe(activeUsers, socket.id, socket);
  });
});
