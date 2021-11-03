const socket = window.io();

const createNameFromId = (socketId) => {
  const name = socketId.split('')
    .splice(socketId.length - 16)
    .join('');
  return name;
};

const userForm = document.getElementById('new-user-form');
const userInput = document.getElementById('new-user-input');
const userList = document.getElementById('users-list');
// const saveName = document.getElementById('save-nickname');

const textForm = document.getElementById('message-form');
const chatText = document.getElementById('text-input');
const chatMessages = document.getElementById('message-list');

let savedName;

const createUser = (allUsers) => {
  userList.innerHTML = '';
  const current = (savedName || createNameFromId(socket.id));
  allUsers.forEach((user) => {
    const userLi = document.createElement('li');
    userLi.innerText = user;
    userLi.dataset.testid = 'online-user';
      if (user === current) { 
        userList.prepend(userLi);
      } else { userList.appendChild(userLi); }
  });
};

const createMessage = async (msg) => {
  const messageLi = document.createElement('li');
  messageLi.innerText = msg;
  messageLi.dataset.testid = 'message';
  chatMessages.appendChild(messageLi);
};

textForm.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(savedName);
  const nickname = savedName;
  const chatMessage = chatText.value;
  socket.emit('message', { chatMessage, nickname });
  chatText.value = '';
  return false;
});

userForm.addEventListener('submit', (event) => {
  event.preventDefault();
  savedName = userInput.value;
  socket.emit('save-user', userInput.value);
  userInput.value = '';
  return false;
});

socket.on('new-user', (name) => createUser(name));

socket.on('get-messages', (arrayMessages) => {
  arrayMessages.forEach((message) => createMessage(message));
});

socket.on('new-connection', (name) => createUser(name));
socket.on('disconnected', (name) => createUser(name));

socket.on('message', (msg) => createMessage(msg));
