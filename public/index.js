const socket = window.io();
const form = document.querySelector('form');
const inputMessage = document.querySelector('#message-input');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const chatMessage = inputMessage.value;
  const nickname = 'Alexandre';
  socket.emit('message', { nickname, chatMessage });
  inputMessage.value = '';
  return false;
});

const createChatMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('message', (message) => {
  createChatMessage(message);
});