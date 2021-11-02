const { format } = require('date-fns'); // dica pacote date-fns: BiaZidioti

const time = format(new Date(), 'dd-MM-yyyy HH:mm:ss');

const getNickName = (arr, sockedId) => {
  const nickName = arr.find((ele) => ele.id === sockedId);
  return nickName.name;
};

const getMessageRes = (nickName, userMsg) => (
  `${time} - ${nickName}: ${userMsg}`
  );

const userToken = (str) => str.substring(0, 16);

const createUser = (socketId) => {
  const user = { id: socketId, name: userToken(socketId) };
  return user;
};

const addUser = (arr, socketId) => {
  const newList = [...arr, createUser(socketId)];
  return newList;
};

const kickUser = (arr, id) => {
  const newList = arr.filter((ele) => 
    ele.id.toString() !== id.toString());
  return newList; 
};

const listUsers = (arr) => {
  const userList = arr.map(userToken);
  return userList;
};

const nickNameList = (arr) => arr.map((e) => e.name);

module.exports = {
  getNickName,
  createUser,
  getMessageRes,
  nickNameList,
  listUsers,
  kickUser,
  addUser,
};
