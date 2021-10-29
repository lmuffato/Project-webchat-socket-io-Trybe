const socket = window.io();

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('clientMessage', inputMessage.value);

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
