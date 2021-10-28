const socket = window.io();

const messagesList = document.querySelector('.messages-list');
const inputMessage = document.querySelector('.messageInput');
const button = document.querySelector('.send-button');
const nicknameButton = document.querySelector('.nickname-btn');
const usersList = document.querySelector('.usersList');

const createMessage = (message) => {
  const p = document.createElement('p');
  p.innerText = message;
  p.setAttribute('data-testid', 'message');
  messagesList.appendChild(p);
};

let generateNickname = '';

const inputNickname = document.querySelector('.nicknameInput');

// Adaptado de: https://stackoverflow.com/questions/43547777/how-to-create-a-random-string-from-a-regular-expression
const randomID = (length, firstRange, secondRange) => {
  let str = '';
  const unifyArray = [];
  const firstArr = firstRange;
  const secondArr = secondRange;
  unifyArray.push(firstRange);
  unifyArray.push(secondRange);
 
  for (let index = 0; index <= length; index += 1) {
    const ind = Math.floor(Math.random() * unifyArray.length);
    const min = firstArr[ind].charCodeAt(0); 
    const max = secondArr[ind].charCodeAt(0);
    const charCod = Math.floor(Math.random() * (max - min + 1)) + min;
    str += String.fromCharCode(charCod);
  }
  return str.substring(0, 16);
};

const randomChar = ['A', 'B', 'C', 'D', 'E', 'F',
'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z'];
const randomNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

nicknameButton.addEventListener('click', (ev) => {
  ev.preventDefault();
  if (inputNickname.value) {
    generateNickname = inputNickname.value;
    inputNickname.value = '';
    return socket.emit('generateNickname', generateNickname);
  }
  generateNickname = randomID(16, randomChar, randomNumber);
  return socket.emit('generateNickname', generateNickname);
});

button.addEventListener('click', (ev) => {
  ev.preventDefault();
  const backupNickname = socket.id.substring(0, 16);
  if (inputMessage.value) {
    const msgData = { nickname: generateNickname || backupNickname,
      chatMessage: inputMessage.value };
    inputMessage.value = '';
    socket.emit('message', msgData);
  }
  // console.log(msgData);
});

socket.on('usersOnline', (data) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  data.forEach((d) => {
    li.innerText = d;
    usersList.appendChild(li);
  });
  console.log(data, 'data');
});

// Outra forma de fazer a renderização das msgs
// socket.on('refreshAllMessages', (data) => {
//   // console.log(data, 'data');
//   data.forEach((item) => {
//     const { message, nickname, timestamp } = item;
//     const formatMsg = `${timestamp} - ${nickname}: ${message}`;
//     createMessage(formatMsg);
//   });
//   socket.emit('refreshAllMessages', data);
// });

socket.on('message', (data) => {
  createMessage(data);
});
