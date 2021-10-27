const socket = window.io();

const form = document.querySelector('form');
const inputMessage = document.querySelector('#input-message');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', inputMessage.value);
  inputMessage.value = '';
});

const createMessage = (message) => {
  const messagesList = document.querySelector('#chat-messages');
  const li = document.createElement('li');
  li.innerHTML = message;
  messagesList.appendChild(li);
};

socket.on('message', (message) => createMessage(message));
socket.on('serverMessage', ({ message }) => createMessage(message));
