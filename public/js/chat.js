const socket = window.io();

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');
const inputNickname = document.querySelector('#userNickname');

const username = undefined;
  
socket.emit('joinChat', { username });

const changeNickname = () => {
  console.log('Entrei aqui', inputNickname.value === '');
  
  if (inputNickname.value === '') return false;

  sessionStorage.setItem('nickName', inputNickname.value);
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

/* 
  Consegui trocar o uso do Qs.parse utilizando o uso do URLSearchParams segundo esse link:
  https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
*/