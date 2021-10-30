const { dateConvertBrasilAMPM } = require('./dateFunctions.js');
const { create, getAll } = require('../../models/messages/messageModels.js');

// Recupera o nickName da lista de usuários conectados
const getNickName = (arr, sockedId) => {
  const nickName = arr.find((ele) => ele.id === sockedId);
  return nickName.name;
};

// Salvar mensagem no banco de dados
const saveMessageOnDataBase = (nickName, userMsg) => {
  const obj = {
    message: userMsg,
    nickname: nickName,
    timestamp: dateConvertBrasilAMPM(),
  };
  create(obj);
};

// recuperar as mensagens do banco de dados
const recoveryMsgOnDataBase = () => {
  const oldMsg = getAll();
  return oldMsg;
};

// Cria o nick aleatório através do socket.id
const nickGenerator = (str) => str.substring(0, 16);

// Cria um objeto de usuário contendo o id do socket.id e o nome;
const createObjUser = (socketId) => {
  const obj = { id: socketId, name: nickGenerator(socketId) };
  return obj;
};

// Adiciona novos usuários pelo socket.id
const addUserConnected = (arr, socketId) => {
  const newList = [...arr, createObjUser(socketId)];
  return newList;
};

// Remove usuários pelo socket.id
const removeUserDisconnected = (arr, id) => {
  const newList = arr.filter((ele) => 
    ele.id.toString() !== id.toString());
  return newList; 
};

// Cria a mensagem no front-end
const messageToReturn = (nickName, userMsg) => (
  `${dateConvertBrasilAMPM()} - ${nickName}: ${userMsg}`
  );

// Muda o nickname na lista
const changenickName = (arr, socketId, nickName) => {
  const newList = arr.map((ele) => {
    if (ele.id === socketId) {
      const newObject = { ...ele, name: nickName }; // Método não mutável
      return newObject;
    }
    return ele;
  });
  return newList;
};

const nickNameList = (arr) => arr.map((ele) => ele.name);

module.exports = {
  getNickName,
  createObjUser,
  messageToReturn,
  nickNameList,
  removeUserDisconnected,
  addUserConnected,
  changenickName,
  saveMessageOnDataBase,
  recoveryMsgOnDataBase,
 };
