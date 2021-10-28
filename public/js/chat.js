const socket = window.io();

const messagesList = document.querySelector('.messages-list');
const inputMessage = document.querySelector('.messageInput');
const button = document.querySelector('.send-button');
const nicknameButton = document.querySelector('.nickname-btn');
const usersList = document.querySelector('.usersList');
const inputNickname = document.querySelector('.nicknameInput');

const createMessage = (message) => {
  const p = document.createElement('p');
  p.innerText = message;
  p.setAttribute('data-testid', 'message');
  messagesList.appendChild(p);
};

let generateNickname = '';

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

const nickNames = [];
sessionStorage.setItem('nickNames', nickNames);

nicknameButton.addEventListener('click', (ev) => {
  ev.preventDefault();
  if (inputNickname.value) {
    generateNickname = inputNickname.value;
    inputNickname.value = '';
    socket.emit('generateNickname', generateNickname);
  }
});

button.addEventListener('click', (ev) => {
  ev.preventDefault();
  if (inputMessage.value) {
    if (!generateNickname) {
      generateNickname = randomID(16, randomNumber, randomChar);
    }
    const msgData = { nickname: generateNickname, chatMessage: inputMessage.value };
    socket.emit('message', msgData);
    inputMessage.value = '';
  }
  // console.log(msgData);
});

const setNicknameInList = (name) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.innerText = name;
  return usersList.appendChild(li);
};

socket.on('usersOnline', (data) => {
  usersList.textContent = '';

  if (!generateNickname) {
    generateNickname = data[data.length - 1];
  }

  setNicknameInList(generateNickname);

  const users = data.filter((userName) => userName !== generateNickname);

  users.forEach((user) => setNicknameInList(user));
});

socket.on('message', (data) => {
  createMessage(data);
});

window.onbeforeunload = () => {
  socket.disconnect();
};
