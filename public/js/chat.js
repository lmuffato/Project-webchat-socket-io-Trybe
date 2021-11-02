const socket = window.io();

const userForm = document.getElementById('new-user-form');
const userInput = document.getElementById('new-user-input');
const userList = document.getElementById('users-list');
// const saveName = document.getElementById('save-nickname');

const textForm = document.getElementById('message-form');
const chatText = document.getElementById('text-input');
const chatMessages = document.getElementById('message-list');

let savedName;

const createUser = (name) => {
  const userLi = document.createElement('li');
  userLi.innerText = name;
  userLi.className = 'user-li';
  userLi.dataset.testid = 'online-user';
  userList.appendChild(userLi);
};

const createMessage = async (msg) => {
  const messageLi = document.createElement('li');
  messageLi.innerText = msg;
  messageLi.dataset.testid = 'message';
  chatMessages.appendChild(messageLi);
};

textForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const nickname = savedName;
  const chatMessage = chatText.value;
  socket.emit('message', { chatMessage, nickname });
  chatText.value = '';
  return false;
});

userForm.addEventListener('submit', (event) => {
  event.preventDefault();
  socket.emit('save-user', userInput.value);
  userInput.value = '';
  return false;
});

socket.on('new-user', (name) => {
  savedName = (name);
  createUser(name);
});

socket.on('get-messages', (arrayMessages) => {
  arrayMessages.forEach((message) => createMessage(message));
});

socket.on('new-connection', (name) => createUser(name));

socket.on('message', (msg) => createMessage(msg));
