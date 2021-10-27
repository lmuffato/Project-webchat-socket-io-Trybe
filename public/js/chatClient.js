const socket = window.io();
const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');
const nickNameBox = document.querySelector('#nickNameBox');
const onlineUsers = document.querySelector('#onlineUsers');
const TEST_ID = 'data-testid';

const changeNick = () => {
  const nickName = document.querySelector('#onlineUser');
  if (nickNameBox.value.length < 1) return;
  sessionStorage.setItem('name', nickNameBox.value);
  nickName.innerText = nickNameBox.value;
  socket.emit('updateNick', nickNameBox.value);
};

changeNick();

const getOnlineUsers = (users) => {
  const allUsers = Object.values(users);
  onlineUsers.innerText = '';
  allUsers.forEach((user) => {
  const li = document.createElement('li');
  li.setAttribute('id', 'onlineUser');
  li.setAttribute(TEST_ID, 'online-user');
  li.classList.add('nickName');
  li.innerText = user;
  onlineUsers.appendChild(li);
  });
};

const setRandomName = (nick) => {
  sessionStorage.setItem('name', nick);
  const li = document.createElement('li');
  li.setAttribute('id', 'onlineUser');
  li.setAttribute(TEST_ID, 'online-user');
  li.classList.add('nickName');
  li.innerText = nick;
  onlineUsers.appendChild(li);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nickname = sessionStorage.getItem('name');
  const chatMessage = inputMessage.value;
  socket.emit('message', { chatMessage, nickname });
  inputMessage.value = '';
  return false;
});

const serverMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.setAttribute(TEST_ID, 'message');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('message', (message) => serverMessage(message));
socket.on('nickname', (randomName) => setRandomName(randomName));
socket.on('login', (users) => getOnlineUsers(users));

window.onbeforeunload = () => {
  socket.disconnect();
};
