/*
const { dateConvertBrasilAMPM } = require('./dateFunctions.js');
const Model = require('../../models/messages/messageModels.js');

let activeUsers = [];

// Cria o nick aleatório através do socket.id
const nickGenerator = (str) => str.substring(0, 16);

// Cria um objeto de usuário contendo o id do socket.id e o nome;
const createObjUser = (socketId) => {
  const obj = { id: socketId, name: nickGenerator(socketId) };
  return obj;
};

const addUserConnected = (socketId) => {
  const newList = [...activeUsers, createObjUser(socketId)];
  activeUsers = newList;
};

// Adiciona novos usuários pelo socket.id
const addUserConnected = (arr, socketId) => {
  const newList = [...arr, createObjUser(socketId)];
  return newList;
};

// Recupera o nickName da lista de usuários conectados
const getNickName = (arr, sockedId) => {
  const nickName = arr.find((ele) => ele.id === sockedId);
  return nickName.name;
};

// Salvar mensagem no banco de dados
const saveMessageOnDataBase = async (nickName, userMsg) => {
  const obj = {
    message: userMsg,
    nickname: nickName,
    timestamp: dateConvertBrasilAMPM(),
  };
  await Model.create(obj);
};

// recuperar as mensagens do banco de dados
const recoveryMsgOnDataBase = async () => {
  const oldMsg = await Model.getAll();
  return oldMsg;
};

// Remove usuários pelo socket.id
const removeUserDisconnected = (arr, id) => {
  const newList = arr.filter((ele) => 
    ele.id.toString() !== id.toString());
  return newList; 
};

// Cria a mensagem no front-end
const messageToReturn = (nickName, userMsg) => {
  const timestamp = dateConvertBrasilAMPM();
  saveMessageOnDataBase(nickName, userMsg);
 return (`${timestamp} - ${nickName}: ${userMsg}`);
};

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
  recoveryMsgOnDataBase,
  activeUsers,
 };
*/