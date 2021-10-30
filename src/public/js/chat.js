// const Moniker = require('moniker');

const socket = window.io();

const messageTextBox = document.getElementById('write-message');

const buttonSendMessage = document.getElementById('send-message');

const messagesContainer = document.getElementById('messages-container');

const userListContainer = document.getElementById('online-users');

const nicknameTextBox = document.getElementById('user-nickname');

const buttonSaveNickname = document.getElementById('save-nickname');

const nicknameDisplay = document.getElementById('nickname');

let nickname = '';

if (localStorage.getItem('nickname') !== null) {
  nickname = JSON.parse(localStorage.getItem('nickname'));
} else {
  nickname = `usuario-numero${parseInt(Math.random() * 10 + 10, 10)}`;
}

nicknameDisplay.innerText = nickname;

socket.emit('updateUserList', nickname);

const handleMessage = (event) => {
  event.preventDefault();
  const chatMessage = messageTextBox.value;
  messageTextBox.value = '';
  socket.emit('message', { chatMessage, nickname });
};

const addNewMessage = (message) => {
  const newMessage = document.createElement('li');
  newMessage.innerText = message;
  newMessage.classList.add('message');
  newMessage.setAttribute('data-testid', 'message');
  messagesContainer.appendChild(newMessage);
};

const updateUserList = (userList) => {
  const userListOrderly = Object.values(userList).reverse();
  userListContainer.innerHTML = '';
  userListOrderly.forEach((userNickname) => {
    const newUser = document.createElement('li');
    newUser.innerText = userNickname;
    newUser.classList.add('message');
    newUser.setAttribute('data-testid', 'online-user');
    userListContainer.appendChild(newUser);
  });
};

const handleSaveNickname = (event) => {
  event.preventDefault();
  nickname = nicknameTextBox.value;
  nicknameTextBox.value = '';
  socket.emit('updateUserList', nickname);
  nicknameDisplay.innerText = nickname;
  localStorage.setItem('nickname', JSON.stringify(nickname));
};

socket.on('message', addNewMessage);

socket.on('updateUserList', updateUserList);

buttonSendMessage.addEventListener('click', handleMessage);

buttonSaveNickname.addEventListener('click', handleSaveNickname);
