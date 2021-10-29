const socket = window.io();

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');
const inputNickname = document.querySelector('#userNickname');

const username = sessionStorage.getItem('nickname') === null 
  ? undefined : sessionStorage.getItem('nickname');
  
socket.emit('joinChat', { username });

const changeNickname = () => {  
  if (inputNickname.value === '') return false;

  sessionStorage.setItem('nickname', inputNickname.value);
  inputNickname.value = '';
};

changeNickname();

form.addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('message', { chatMessage: inputMessage.value, nickname: username });

  inputMessage.value = '';

  return false;
});

const createMessage = (message) => {
  const messageUl = document.querySelector('.messages');
  const li = document.createElement('li');

  li.innerText = message;

  messageUl.appendChild(li);
};

socket.on('serverMessage', (message) => createMessage(message));
