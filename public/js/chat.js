const socket = window.io();

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const chatMessage = inputMessage.value;
  const nickname = socket.id;
  socket.emit('message', { chatMessage, nickname });
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const ul = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  ul.appendChild(li);
};

socket.on('message', (message) => createMessage(message));
window.onbeforeunload = (_event) => {
  socket.disconnect();
};