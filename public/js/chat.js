const socket = window.io();

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');

const urlSearchParams = new URLSearchParams(window.location.search);

const { username } = Object.fromEntries(urlSearchParams.entries());
  
socket.emit('joinChat', { username });

form.addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('clientMessage', `${username}: ${inputMessage.value}`);

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