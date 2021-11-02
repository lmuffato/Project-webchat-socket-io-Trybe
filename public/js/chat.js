const socket = window.io();

const form = document.querySelector('form');
const btnNick = document.querySelector('#nickname-button');
const inputMessage = document.querySelector('.messageInput');
const inputNick = document.querySelector('#nickname-input');
const DATATESTID = 'data-testid';
let personalNick;

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
  result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
  }
  
const nickname = makeid(16); 

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const chatMessage = inputMessage.value;
  socket.emit('message', { chatMessage, nickname: personalNick || nickname });
  inputMessage.value = '';
  return false;
});

btnNick.addEventListener('click', (_e) => {
  personalNick = inputNick.value;
  document.getElementById(nickname).innerText = inputNick.value;
  inputNick.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('.messages');
  const li = document.createElement('li');
  li.setAttribute(DATATESTID, 'message');
  li.innerText = message;
  messagesUl.appendChild(li);
};

const onlineUsers = () => {
  const usersUl = document.querySelector('#online-users');
  const li = document.createElement('li');
  li.setAttribute(DATATESTID, 'online-user');
  li.setAttribute('id', nickname);
  li.innerText = nickname;
  usersUl.appendChild(li);
  return false;
};

const renderHistoryMessages = (messages) => {
  console.log(messages);
  messages.forEach((message) => createMessage(message));
};

  socket.on('message', (message) => createMessage(message));
  socket.on('messageHistory', (messages) => renderHistoryMessages(messages));
  window.onload(onlineUsers());
