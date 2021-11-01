/*
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

const personalizedListMe = async (arr, socketId, socket) => {
  let newList = arr;
  newList = newList.filter((ele) => ele.id !== socketId);
  const me = arr.find((ele) => ele.id === socketId);
  const forMe = [me, ...newList];
  const forOthers = [...newList, me];
  await socket.emit('activeClients', await nickNameList(forMe));
  await socket.broadcast.emit('activeClients', await nickNameList(forOthers));
};

// const personalizedListDesconected = (arr, socketId, socket) => {
//   const list = personalizedListMe(arr, socketId, socket);
//   let newList = arr;
//   newList = newList.filter((ele) => ele.id !== socketId);
// };

// eslint-disable-next-line max-lines-per-function
module.exports = (io) => io.on('connection', async (socket) => {
  // console.log(`Alguém ${socket.id} se conectou`);
  // const b = await = recoveryMsgOnDataBase();
  const msgHistoric = await recoveryMsgOnDataBase();
  socket.emit('msgHistoric', msgHistoric);
  // console.log(await recoveryMsgOnDataBase());
  // Atualiza a lista quando um usuáiro é conectado
  activeUsers = [...addUserConnected(activeUsers, socket.id)];

  socket.emit('myNick', getNickName(activeUsers, socket.id));
  const b = await personalizedListMe(activeUsers, socket.id, socket);
  console.log(b);
  // await personalizedListMe(activeUsers, socket.id, socket);
  // socket.broadcast.emit('serverMessage', personalizedListOthers(activeUsers, socket.id));
  // socket.emit('activeClients', personalizedListMe(activeUsers, socket.id));

  // Atualiza a lista para todos os usuários conectados
  io.emit('activeClients', nickNameList(activeUsers));

  // Quando algum usuário salva um novo nickname
  socket.on('nickName', async (nickName) => {
    // Atualzia o nome na lista de usuáiros ativos
    activeUsers = changenickName(activeUsers, socket.id, nickName);

    // await personalizedListMe(activeUsers, socket.id, socket);

    // Atualiza a lista para todos os usuários conectados
    socket.emit('myNick', getNickName(activeUsers, socket.id));

    // console.log(personalizedListOthers(activeUsers, socket.id));
    // socket.broadcast.emit('serverMessage', personalizedListOthers(activeUsers, socket.id));
    // socket.emit('activeClients', personalizedListMe(activeUsers, socket.id));
    io.emit('activeClients', nickNameList(activeUsers));
  });

  // Quando a mensagem é enviada pelo front-end
  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit('message', messageToReturn(nickname, chatMessage));
    // Manda a mensagem de volta para todos os usuários conectados
    // const user = getNickName(activeUsers, socket.id);
    // io.emit('message', messageToReturn(user, chatMessage));
    // saveMessageOnDataBase(nickname, chatMessage);
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
*/