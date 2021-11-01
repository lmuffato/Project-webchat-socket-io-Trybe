// const time = new Date(Date.now());
/*
const dateConvertISO8601 = () => {
  const now = new Date();
  const str = `${now
    .getFullYear()}-${now
      .getMonth() + 1}-${now
        .getDate()} ${now
          .getHours()}:${now
            .getMinutes()}:${now
              .getSeconds()}`;
  return str;
};

const dateConvertBrasil = () => {
  const now = new Date();
  const str = `${now
    .getDate()}-${now
      .getMonth() + 1}-${now
        .getFullYear()} ${now
          .getHours()}:${now
            .getMinutes()}:${now
              .getSeconds()}`;
  return str;
};
*/
// const convertHourAMPM = () => {
//   const now = new Date();
//   const hour = `${now.getHours()}`;
//   const min = `${now.getMinutes()}`;
//   const seg = `${now.getSeconds()}`;

//   if (hour >= 12) { return (`${hour - 12}:${min}:${seg} PM`); }
//     return (`${hour}:${min}:${seg} AM`);
// };

// console.log(dateConvertISO8601());
// console.log(dateConvertBrasil());
// console.log(dateConvertBrasilAMPM());

// console.log(convertHourAMPM());

// const dateConvertBrasilAMPM = () => {
//   const now = new Date();
//   const str = `${now
//     .getDate()}-${now
//       .getMonth() + 1}-${now
//         .getFullYear()} ${convertHourAMPM()}`;
//   return str;
// };

// console.log(dateConvertBrasilAMPM());

// const b = 'lBnlTvoIkhjvPbiOAAAE';

// const c = b.substring(0, 16);

// console.log(c);
/*
const userList = [
  { id: '1', name: 'A' },
  { id: '2', name: 'A' },
  { id: '3', name: 'A' },
];

const filterUserDisconnectedBySocketId = (arr, id) => {
  const newList = arr.filter((ele) => 
    ele.id.toString() !== id.toString());
  return newList; 
};

const adddUserConnectedBySocketId = (arr, obj) => {
  const newList = [...arr, obj];
  return newList;
};

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

const objUser = { id: '4', name: 'F' };

// console.log(filterUserDisconnectedBySocketId(userList, 2));
// console.log(adddUserConnectedBySocketId(userList, objUser));

// console.log(userList);
console.log(changenickName(userList, '2', 'Lucas'));
console.log(userList);

// const verifyIfCanCreateNewExchangeByKeyA = (obj) => {
//   if((keyB(obj) === actualExchange && keyB(obj) !== currency)) return obj;
// }

// const removeUserList = (arr, id) => {
//   const arrayFiltred = 
//   // return arr;
// };

// console.log(removeUserList(array,''));
*/

// let activeUsers = [
//   { id: '1K1zAslD6JAcOu06AAAC', name: 'lucas' },
//   { id: '1K1zAslD6JAcOu06AAAD', name: 'tiago' },
// ];

// const getNickName = (arr, sockedId) => {
//   const nickName = arr.find((ele) => ele.id === sockedId);
//   return nickName.name;
// };

// console.log(getNickName(activeUsers, '1K1zAslD6JAcOu06AAAD'));
/*
let list = ["email","role","type","name"];

const personalizedListMe = (arr, socketId) => {
  let newList = arr;
  newList = newList.filter((ele) => ele.id !== socketId);
  const me = arr.find((ele) => ele.id === socketId);
  newList = [me, ...newList];
  return newList;
};

const personalizedListOthers = (arr, socketId) => {
  let newList = arr;
  newList = newList.filter((ele) => ele.id !== socketId);
  const me = arr.find((ele) => ele.id === socketId);
  newList = [...newList, me];
  return newList;
};

console.log(personalizedList(list, 'role'));
*/

// const user = ['lucas', 'tiago'];

// user.concat(['matheus']);

// console.log(user.concat(['matheus']));