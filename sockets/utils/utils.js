/* Objeto padrão da lista de clients:
let activeUsers = [
  { id: '1K1zAslD6JAcOu06AAAC', name: 'lucas' },
];
*/

// Converte a hora do formato 24 para 12 AM/PM
const convertHourToShapeAmPm = () => {
  const now = new Date();
  const hour = `${now.getHours()}`;
  const min = `${now.getMinutes()}`;
  const seg = `${now.getSeconds()}`;

  if (hour >= 12) { return (`${hour - 12}:${min}:${seg} PM`); }
    return (`${hour}:${min}:${seg} AM`);
};

// Converte a data para o formato usado no brasil
const dateConvertBrasilAMPM = () => {
  const now = new Date();
  const str = `${now
    .getDate()}-${now
      .getMonth() + 1}-${now
        .getFullYear()} ${convertHourToShapeAmPm()}`;
  return str;
};

// Recupera o nickName da lista de usuários conectados
const getNickName = (arr, sockedId) => {
  const nickName = arr.find((ele) => ele.id === sockedId);
  return nickName.name;
};

// Cria a mensagem no front-end
const messageToReturn = (nickName, userMsg) => (
  `${dateConvertBrasilAMPM()} - ${nickName}: ${userMsg}`
  );

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

// Lista de usuários ativos
const listActiveUser = (arrayUsers) => {
  const nickList = arrayUsers.map(nickGenerator);
  return nickList;
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
  listActiveUser,
  removeUserDisconnected,
  addUserConnected,
  changenickName,
 };
