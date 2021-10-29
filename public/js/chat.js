const socket = window.io();

const userForm = document.getElementById('new-user-form');
const userInput = document.getElementById('new-user-input');
const userList = document.getElementById('users-list');
// const saveName = document.getElementById('save-nickname');

const textForm = document.getElementById('message-form');
const chatText = document.getElementById('text-input');
const chatMessages = document.getElementById('message-list');

let savedName;

const getName = () => {
  const socketId = socket.id;
  const nameArray = socketId.split('')
    .splice(socketId.length - 16)
    .join('');
  return nameArray;
};

textForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const nickname = savedName;
  const chatMessage = chatText.value.toString();
  socket.emit('message', { chatMessage, nickname });
  chatText.value = '';
  return false;
});

const createMessage = (msg) => {
  const messageLi = document.createElement('li');
  messageLi.innerText = msg;
  messageLi.dataset.testid = 'message';
  chatMessages.appendChild(messageLi);
};

socket.on('message', (msg) => {
  createMessage(msg);
});

userForm.addEventListener('submit', (event) => {
  event.preventDefault();
  socket.emit('save-user', userInput.value);
  userInput.value = '';
  return false;
});

const createUser = (name) => {
  const userLi = document.createElement('li');
  userLi.innerText = name;
  userLi.dataset.testid = 'online-user';
  userList.appendChild(userLi);
};

socket.on('new-connection', (_name) => {
  savedName = getName();
  createUser(savedName);
});

socket.on('new-user', (serverReturn) => {
  savedName = (serverReturn.nickName);
  createUser(serverReturn.nickName);
});
